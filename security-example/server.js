const fs = require("fs");
const path = require("path");
const express = require("express");
const https = require("https");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
  res.send("personal secret");
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
