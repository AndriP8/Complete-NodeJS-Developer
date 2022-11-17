const path = require("path");

const getMessages = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "skimountain.jpg"));
};

const postMessage = (req, res) => {
  console.log("updating messages");
};

module.exports = { getMessages, postMessage };
