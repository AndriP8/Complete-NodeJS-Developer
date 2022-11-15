const express = require("express");

const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: "Albert Einstein"
  },
  {
    id: 1,
    name: "Isaac Newton"
  }
];

app.get("/friends", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist"
    });
  }
});

app.get("/message", (req, res) => {
  res.send("Hello from message");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
