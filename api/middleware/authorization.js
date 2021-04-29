const { locale } = require("../../locale");
const { isAdmin, findUserWithUsername } = require("../services/userService");

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

const tweetsAuthorization = (req, res, next) => {
  next();
};

module.exports = { usersAuthorization, tweetsAuthorization };
