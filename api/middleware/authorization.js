const { locale } = require("../../locale");
const { isAdmin } = require("../../services/userService");
const User = require("../users/model");

const usersRemoveAuth = async (req, res, next) => {
  const { userId, id } = req.body;
  const user = await User.findOne({ _id: id });
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

const usersUpdateAuth = async (req, res, next) => {
  const idParam = req.params.id;
  const { userId } = req.body;
  const user = await User.findOne({ _id: idParam });
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

module.exports = { usersRemoveAuth, usersUpdateAuth };
