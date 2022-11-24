const launchesDatabase = require("./launches.mongo");

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

const saveLaunch = async (launch) => {
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber
    },
    launch,
    { upsert: true }
  );
};

saveLaunch(launch);

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
  addNewLauch,
  abortLaunchById
};
