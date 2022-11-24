const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

const habitablePlanets = [];

const isHabitablePlanets = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanets(data)) {
          savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetFound = (await getAllPlanets()).length;
        console.log(`${countPlanetFound} habitable planets found`);
        resolve();
      });
  });
};

const savePlanet = async (planet) => {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name
      },
      {
        keplerName: planet.kepler_name
      },
      { upsert: true }
    );
  } catch (error) {
    console.error(`Could now save planet ${error}`);
  }
};

const getAllPlanets = async () => {
  return await planets.find({});
};

module.exports = {
  getAllPlanets,
  loadPlanetsData
};
