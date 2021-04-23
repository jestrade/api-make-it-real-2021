const { locale } = require('../../locale');

const usersAuthorization = (req, res, next) => {
  next();
};

const tweetsAuthorization = (req, res, next) => {
  next();
};

module.exports = { usersAuthorization, tweetsAuthorization };
