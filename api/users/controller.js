const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { locale } = require('../../locale');
const { config } = require('../../config');

const User = require('./model');

const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  User.find({ active: true }, ['name', 'username', 'createdAt', 'updatedAt'])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (users) => {
      const total = await User.estimatedDocumentCount();
      const totalPages = Math.round(total / limit);
      const hasMore = page < totalPages;

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        users,
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
      .json({ message: locale.translate('errors.user.userExists') });
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

const update = (req, res) => {
  const usernameParam = req.params.username;
  const { name, email, username, password } = req.body;

  if (name && email && username && password) {
    const user = {
      name,
      email,
      username,
      password,
    };
  }
  //to do
};

const login = (req, res) => {
  const { username, password } = req.body;

  const user = {
    username,
    password,
  };

  const found = users.filter(
    (u) => u.username === user.username && u.password === user.password
  );

  if (found && found.length > 0) {
    const token = jwt.sign({ username: user.username }, config.jwtKey);
    res.status(200).json({ token });
  } else {
    res.status(500).json({ message: 'user not exists' });
  }
};

const remove = (req, res) => {
  const { username } = req.body;

  //to do
};

module.exports = {
  list,
  create,
  update,
  login,
  remove,
};
