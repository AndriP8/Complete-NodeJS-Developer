const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchsRouter = require("./routes/launches/launches.router");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000 "
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.use(launchsRouter);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
