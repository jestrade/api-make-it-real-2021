const { locale } = require('./../../locale');

const usersAuthorization = (req, res, next) => {
  const { username, authUsername } = req.body;
  if (username === authUsername) {
    next();
  } else {
    res.status(500).json({ message: locale.translate('errors.notAuthorized') });
  }
};

module.exports = { usersAuthorization };
