const express = require('express');
const api = require('./../api');
const { config } = require('./../config');

const { port } = config.http;

const app = express();
app.use(express.json());
app.use('/api', api);
app.use('/api/v1', api);

const init = () => {
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}...`);
  });
};

module.exports = { init };
