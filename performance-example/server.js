const express = require("express");

const app = express();

const delay = (duration) => {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {}
};

app.get("/", (req, res) => {
  res.send(`Performance example ${process.pid}`);
});

console.log("Running server.js....");
app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`..... ${process.pid}`);
});

app.listen(3000);
