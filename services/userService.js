const User = require("../api/users/model");

const isAdmin = async (userId) => {
  const foundUser = await User.findOne({ _id: userId });
  if (foundUser) {
    const role = foundUser.role;
    if (role === "admin") {
      return true;
    }
    return false;
  }
  return false;
};

module.exports = { isAdmin };
