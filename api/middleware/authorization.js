const { locale } = require("../../locale");
const { isAdmin } = require("../../services/userService");
const User = require("../users/model");

const usersAuth = async (req, res, next) => {
  const { userId, username } = req.body;
  const user = await User.findOne({ username });
  const isAdminValidation = await isAdmin(userId);

  if (user) {
    if (userId == user._id || isAdminValidation) {
      next();
    } else {
      res
        .status(401)
        .json({ message: locale.translate("errors.notAuthorized") });
    }
  }

  if (!user) {
    res
      .status(401)
      .json({ message: locale.translate("errors.user.userNotExists") });
  }
};

const tweetsAuthorization = (req, res, next) => {
  next();
};

module.exports = { usersAuth, tweetsAuthorization };
