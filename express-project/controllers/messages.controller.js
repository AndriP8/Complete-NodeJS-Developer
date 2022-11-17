const getMessages = (req, res) => {
  res.send("Hello from message");
};

const postMessage = (req, res) => {
  console.log("updating messages");
};

module.exports = { getMessages, postMessage };
