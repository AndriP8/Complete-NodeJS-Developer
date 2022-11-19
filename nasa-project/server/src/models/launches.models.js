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

const getAllLaunches = () => {
  return Array.from(launches.values());
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

module.exports = {
  getAllLaunches,
  addNewLauch
};
