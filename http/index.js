const express = require("express");
const api = require("../api");
const { config } = require("../config");

const { host, port } = config.http;

const app = express();
app.use(express.json());
app.use("/api", api);
app.use("/api/v1", api);

const init = () => {
  app.listen(port, host, () => {
    /* eslint-disable no-console */
    console.log(`Server running at http://${host}:${port}`);
    /* eslint-disable no-console */
  });
};

module.exports = { init };
