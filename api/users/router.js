const express = require("express");
const { list, create, update, login, remove } = require("./controller");
const { logger } = require("../middleware/logger");
const { validateUser, validateLogin } = require("../middleware/validator");
const { authenticator } = require("../middleware/authenticator");
const {
  usersRemoveAuth,
  usersUpdateAuth,
} = require("../middleware/authorization");


const router = express.Router();

router.use(logger);

router
  .route("/") //
  .get(list) // list
  .delete(authenticator, usersRemoveAuth, remove) // list
  .post(validateUser, create); // create

router
  .route("/login") //
  .post(validateLogin, login);

router
  .route("/:id") //
  .put(authenticator, usersUpdateAuth, update);

module.exports = router;
