const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({
    id: 1,
    name: "Isaac Newton"
  });
});

app.get("/message", (req, res) => {
  res.send("Hello from message");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
