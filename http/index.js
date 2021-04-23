const express = require('express');
const api = require('../api');
const { config } = require('../config');

const { port } = config.http;

const app = express();
app.use(express.json());
app.use('/api', api);
app.use('/api/v1', api);
app.use(express.static('public'));

const init = () => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`server running in port: ${port}...`);
    /* eslint-enable no-console */
  });
};

module.exports = { init };
