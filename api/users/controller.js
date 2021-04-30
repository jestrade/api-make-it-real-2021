const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { locale } = require("../../locale");
const { config } = require("../../config");

const User = require("./model");

const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  User.find({ active: true }, ["name", "username", "createdAt", "updatedAt"])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (users) => {
      const total = await User.estimatedDocumentCount();
      const totalPages = Math.ceil(total / limit);
      const hasMore = page < totalPages;

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: users,
        currentPage: page,
      });
    });
};

const create = async (req, res) => {
  const { name, email, username, password } = req.body;

  const findUser = await User.find({ $or: [{ username }, { email }] });
  if (findUser.length > 0) {
    res
      .status(500)
      .json({ message: locale.translate("errors.user.userExists") });
    return;
  }

  const salt = bcrypt.genSaltSync(config.saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = {
    name,
    email,
    username,
    password: passwordHash,
  };

  const newUser = new User(user);
  newUser.save().then((userCreated) => {
    res.status(200).json(userCreated);
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });
  if (foundUser) {
    // eslint-disable-next-line no-underscore-dangle
    const userId = foundUser._id;
    const result = await bcrypt.compare(password, foundUser.password);
    if (result) {
      const token = jwt.sign({ userId }, config.jwtKey);

      res
        .status(200)
        .cookie("token", token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })
        .json({
          data: {
            username: foundUser.username,
            name: foundUser.name,
          },
          message: "ok",
        });
    } else {
      res.json({ message: locale.translate("errors.user.userNotExists") });
    }
  } else {
    res.json({ message: locale.translate("errors.user.userNotExists") });
  }
};

const remove = async (req, res) => {
  const { username } = req.body;
  const userFind = await findUserByUsername(username);

  const userDeleted = await User.deleteOne({ _id: userFind._id });

  if (userDeleted.ok === 1) {
    res
      .status(200)
      .json({ message: locale.translate("errors.user.userDeleted") });
  } else {
    res.status(500).json({
      message: `${locale.translate("errors.user.onDelete")} ${username}`,
    });
  }
};

const update = async (req, res) => {
  const usernameParam = req.params.username;
  const { name, email, username, password } = req.body;

  if (name && email && username && password) {
    const user = {
      name,
      email,
      username,
      password,
    };

    const userFind = await findUserByUsername(usernameParam);

    if (userFind) {
      const userUpdated = await User.updateOne(
        { _id: userFind._id },
        {
          $set: { name: user.name, email: user.email, password: user.password },
        }
      );

      if (userUpdated.ok === 1) {
        res.status(204).json();
      } else {
        res.status(500).json({
          message: `${locale.translate(
            "errors.user.onUpdate"
          )} ${usernameParam}`,
        });
      }
    } else {
      res.status(500).json({
        message: `${locale.translate(
          "errors.user.userNotExist"
        )} ${usernameParam}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

//Find User By Username
const findUserByUsername = async (username) => {
  const userFound = await User.findOne({ username })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.error(err);
    });

  return userFound;
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "ok" });
};

module.exports = {
  list,
  create,
  update,
  remove,
  login,
  logout,
};
