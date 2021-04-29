const dictionaryENUS = {
  errors: {
    notAuthorized: "unauthorized",
    notAuthenticated: "user not authorized",
    invalidData: "invalid data",
    user: {
      userExists: "user already exists",
      userNotExists: "user not exists",
      onCreate: "error while creating user",
      onDelete: "error while deleted user",
    },
    tweet: {
      onDelete: "error while deleted tweet",
    },
  },
  success: {
    user: {
      userDeleted: "user successfully removed",
    },
    tweet: {
      tweetDeleted: "tweet successfully removed",
    },
  },
};

module.exports = { dictionaryENUS };
