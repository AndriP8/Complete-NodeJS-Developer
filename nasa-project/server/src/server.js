require("dotenv").config();
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.models");
const { loadLaunchData } = require("./models/launches.models");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection ${error}`);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
