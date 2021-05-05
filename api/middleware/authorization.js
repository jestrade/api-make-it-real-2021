const {
  isUserAdmin,
  verifyIfUserExistById,
} = require("../services/userService");
const { locale } = require("../../locale");

const usersAuthorization = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const { userId } = req.body;

  const isAdmin = await isUserAdmin(userId);

  if (id === userId || isAdmin) {
    next();
  } else {
    res.status(403).json({
      message: locale.translate("errors.operationNotAllowed"),
    });
  }
};

const tweetsAuthorization = (req, res, next) => {
  next();
};

module.exports = { usersAuthorization, tweetsAuthorization };
