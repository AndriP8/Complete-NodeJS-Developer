const { getAllPlanets } = require("../../models/planets.models");

const httpGetAllPlanets = (req, res) => {
  return res.status(200).json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets
};
