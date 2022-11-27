const axios = require("axios");

const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "EXplorer IS1",
  laucnDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);

const existLaunchWithId = (launchId) => {
  return launches.has(launchId);
};

const getAllLaunches = async () => {
  return await launchesDatabase.find({}, { "_id:": 0, __v: 0 });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber
    },
    launch,
    { upsert: true }
  );
};

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

const loadLaunchData = async () => {
  console.log("Downloading launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1
          }
        },
        {
          path: "payloads",
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customer = payloads.flatMap((payload) => payload["customers"]);

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      laucnDate: launchDoc["date_local"],
      customer,
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"]
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);
  }
};

const scheduleNewLaunch = async (launch) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch);
};

const addNewLauch = (launch) => {
  latestFlightNumber++;
  launches.set(
    launch.flightNumber,
    Object.assign(launch, {
      customers: ["Zero to mastery", "NASA"],
      flightNumber: latestFlightNumber,
      upcoming: true,
      success: true
    })
  );
};

const abortLaunchById = (launchId) => {
  const aborted = launch.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

module.exports = {
  existLaunchWithId,
  getAllLaunches,
  getLatestFlightNumber,
  addNewLauch,
  abortLaunchById,
  loadLaunchData
};
