const mongoose = require('mongoose');
const { config } = require('../config');

const init = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  await mongoose.connect(config.database.connectionString, options, () => {
    /* eslint-disable no-console */
    console.log('connected to the database');
    /* eslint-enable no-console */
  });
};

module.exports = { init };
