const {
  getAllLaunches,
  addNewLauch,
  existLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch
} = require("../../models/launches.models");
const { getPagination } = require("../../models/query");

const httpGetAllLaunches = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  return await res.status(200).json(await getAllLaunches(skip, limit));
};

const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }

  scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

const httpAbortLaunch = (req, res) => {
  const launchId = Number(req.params.id);

  if (!existLaunchWithId(launchId)) {
    return res.status(400).json({ error: "Launch not found" });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
};

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
