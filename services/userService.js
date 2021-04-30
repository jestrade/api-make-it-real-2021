const User = require("../api/users/model");

const isAdmin = async (userId) => {
  const foundUser = await User.findOne({ _id: userId });
  try {
    if (foundUser) {
      const role = foundUser.role;
      if (role === "admin") {
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { isAdmin };
