const validateTweet = (req, res, next) => {
  const { content } = req.body;
  const errors = [];

  if (content) {
    if (content.length > 280) {
      errors.push("max characters exceded");
    }
  } else {
    errors.push("empty data");
  }
  if (errors.length === 0) {
    next();
  } else {
    res.status(500).json({ message: errors });
  }
};

const validateComment = (req, res, next) => {
  const { comment, tweetId } = req.body;
  const errors = [];

  if (comment && tweetId) {
    if (comment.length > 280) {
      errors.push("max characters exceded");
    }
  } else {
    errors.push("empty data");
  }
  if (errors.length === 0) {
    next();
  } else {
    res.status(500).json({ message: errors });
  }
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (username && password) {
    if (username.length < 6) {
      errors.push("invalid username");
    }
  } else {
    errors.push("empty data");
  }
  if (errors.length === 0) {
    next();
  } else {
    res.status(500).json({ message: errors });
  }
};

const validateUser = (req, res, next) => {
  const {
    name,
    email,
    username,
    password,
    passwordConfirmation,
    role = "registered",
  } = req.body;
  const errors = [];
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const regExpPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  const regExpRole = new RegExp(/^(admin|registered)$/);

  if (name && email && username && password && passwordConfirmation && role) {
    if (name.length < 3) {
      errors.push("invalid name");
    }

    if (username.length < 6) {
      errors.push("invalid username");
    }

    if (!regExpEmail.test(email)) {
      errors.push("invalid email");
    }

    if (password !== passwordConfirmation) {
      errors.push("passwords don't match");
    }

    if (!regExpPassword.test(password)) {
      errors.push("invalid password");
    }
    if (!regExpRole.test(role)) {
      errors.push("invalid role");
    }
  } else {
    errors.push("empty data");
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(500).json({ message: errors });
  }
};

module.exports = {
  validateUser,
  validateLogin,
  validateTweet,
  validateComment,
};
