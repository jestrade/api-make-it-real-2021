const express = require('express');
const api = require('../api');
const { config } = require('../config');

const { host, port } = config.http;

const app = express();
app.use(express.json());
app.use('/api', api);
app.use('/api/v1', api);

const init = () => {
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
};

module.exports = { init };
