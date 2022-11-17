const express = require("express");

const friendsController = require("./controllers/friends.controller");
const messagessController = require("./controllers/messages.controller");

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/friends", friendsController.postFriend);

app.get("/friends", friendsController.getFriends);

app.get("/friends/:friendId", friendsController.getFriend);

app.get("/message", messagessController.getMessages);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
