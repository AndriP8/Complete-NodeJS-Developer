const { getAllPlanets } = require("../../models/planets.models");

const httpGetAllPlanets = async (req, res) => {
  return res.status(200).json(await getAllPlanets());
};

module.exports = {
  httpGetAllPlanets
};
