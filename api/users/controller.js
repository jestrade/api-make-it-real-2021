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

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });
  if (foundUser) {
    // eslint-disable-next-line no-underscore-dangle
    const userId = foundUser._id;
    const result = await bcrypt.compare(password, foundUser.password);
    if (result) {
      const token = jwt.sign({ userId }, config.jwtKey);
      res.status(200).json({ token });
    } else {
      res.json({ message: locale.translate('errors.user.userNotExists') });
    }
  } else {
    res.json({ message: locale.translate('errors.user.userNotExists') });
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
