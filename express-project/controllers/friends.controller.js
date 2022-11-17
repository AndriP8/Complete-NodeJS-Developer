const model = require("../models/friends.model");

const postFriend = (req, res) => {
  const friendId = Number(req.params.friendId);
  const friend = model[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist"
    });
  }
};

const getFriend = (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      error: "Missing friend name"
    });
  } else {
    const newFriend = {
      id: model.length + 1,
      name: req.body.name
    };
    model.push(newFriend);

    res.json(newFriend);
  }
};

const getFriends = (req, res) => {
  res.json(model);
};

module.exports = { getFriend, getFriends, postFriend };
