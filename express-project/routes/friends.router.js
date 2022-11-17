const express = require("express");
const friendsRouter = express.Router();

const friendsController = require("../controllers/friends.controller");

friendsRouter.post("/", friendsController.postFriend);
friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getFriend);

module.exports = friendsRouter;
