const express = require("express");

const friendsRouter = require("./routes/friends.router");
const messageRouter = require("./routes/message.router");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/friends", friendsRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
