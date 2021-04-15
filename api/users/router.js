const express = require('express');
const { list, create, update, login, remove } = require('./controller');
const { logger } = require('./../middleware/logger');
const { validateUser, validateLogin } = require('./../middleware/validator');
const { authenticator } = require('./../middleware/authenticator');
const { usersAuthorization } = require('./../middleware/authorization');
const router = express.Router();

router.use(logger);

router
  .route('/') //
  .get(authenticator, list) //list
  .delete(authenticator, usersAuthorization, remove) //list
  .post(validateUser, create); //create

router
  .route('/login') //
  .post(validateLogin, login);

router
  .route('/:username') //
  .put(authenticator, usersAuthorization, update);

module.exports = router;
