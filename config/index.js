const dotenv = require('dotenv');
dotenv.config();

const config = {
  http: {
    port: process.env.HTTP_PORT,
  },
  log: {
    access: process.env.LOG_ACCESS,
  },
  jwtKey: process.env.JWTKEY,
  apiWeatherKey: process.env.APIWEATHERKEY,
};

module.exports = { config };
