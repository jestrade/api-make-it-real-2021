const { locale } = require('../../locale');

const localization = (req, res, next) => {
  const reqLocale = req.headers.locale;
  locale.setCurrentLocale(reqLocale);

  next();
};

module.exports = { localization };
