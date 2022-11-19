const { getAllLaunches } = require("../../models/launches.models");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

module.exports = { httpGetAllLaunches };
