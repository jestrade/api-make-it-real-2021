const dictionaryENUS = {
  errors: {
    notAuthorized: "unauthorized",
    notAuthenticated: "user not authorized",
    invalidData: "invalid data",
    validate: {
      maxCharactersAllowed: "max characters exceeded",
      emptyData: "empty data",
      invalidUsername: "invalid username",
      invalidName: "invalid name",
      invalidEmail: "invalid email",
      passwordsDontMatch: "passwords don't match",
      invalidPassword: "invalid password",
    },
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
      onCreate: "user created successfully",
      onUpdate: "user updated successfully",
      userDeleted: "user removed successfully",
    },
    tweet: {
      onCreate: "tweet created successfully",
      onUpdate: "tweet updated successfully",
      tweetDeleted: "tweet removed successfully",
    },
  },
};

module.exports = { dictionaryENUS };
