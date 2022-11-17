const express = require("express");
const messageRouter = express.Router();

const messagessController = require("../controllers/messages.controller");

messageRouter.get("/", messagessController.getMessages);

module.exports = messageRouter;
