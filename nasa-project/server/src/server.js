const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.models");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:2L11DPUQBbAQLpPu@cluster0.iojat2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection ${error}`);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
