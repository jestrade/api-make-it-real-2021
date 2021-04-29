const { locale } = require("../../locale");
const { isAdmin, findUserWithUsername } = require("../services/userService");
const { findUserByTweetId } = require("../services/tweetService");

const usersAuthorization = async (req, res, next) => {
  const id = await findUserWithUsername(req.body.username);
  const { userId } = req.body;
  const isAdminTemp = await isAdmin(userId);

  if (userId == id || isAdminTemp === true) {
    next();
  } else {
    res.status(403).send("Operation not allowed!");
  }
};

const tweetsAuthorization = async (req, res, next) => {
  const id = await findUserByTweetId(req.body.tweetId);
  const { userId } = req.body;
  const isAdminTemp = await isAdmin(userId);

  if (userId == id || isAdminTemp === true) {
    next();
  } else {
    res.status(403).send("Operation not allowed!");
  }
};

module.exports = { usersAuthorization, tweetsAuthorization };
