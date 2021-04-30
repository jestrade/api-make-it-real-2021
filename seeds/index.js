const database = require("./../database");
const User = require("./../api/users/model");
const { users } = require("./data");

(async () => {
  await database.init();

  User.collection.drop();

  users.forEach(async (user) => {
    const password = Date.now().toString();
    user.password = password;
    user.passwordConfirmation = password;

    console.log("user", user);
    const newUser = new User(user);
    await newUser.save();
  });
})();
