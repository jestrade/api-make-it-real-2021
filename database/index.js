const mongoose = require("mongoose");
const { config } = require("../config");

const init = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(config.database.connectionString, options);
    /* eslint-disable no-console */
    console.log("Connected to the database sucessfully!");
    /* eslint-disable no-console */
  } catch (err) {
    /* eslint-disable no-console */
    console.error(
      `Error connecting to database ->`,
      `Error code: ${err.code}, error reference: ${err.codeName}, message: ${err.message}`
    );
    /* eslint-disable no-console */
  }
};

module.exports = { init };
