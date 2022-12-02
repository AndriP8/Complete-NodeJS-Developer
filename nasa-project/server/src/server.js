const http = require("http");
const app = require("./app");

require("dotenv").config();

const { loadPlanetsData } = require("./models/planets.models");
const { loadLaunchData } = require("./models/launches.models");
const { mongoConnect } = require("./services/mongo");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await mongoConnect();

  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
