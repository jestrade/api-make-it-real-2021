const User = require("../users/model");

const isAdmin = async (userId) => {
  try {
    const isUserAdmin = await User.find({
      $and: [{ _id: userId }, { role: "admin" }],
    });

    if (isUserAdmin.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    res.send("Operation not allowed");
  }
};

const findUserWithUsername = async (username) => {
  try {
    const userIdFind = (await User.findOne({ username: username }))._id;
    return userIdFind;
  } catch (error) {
    res.send("Operation not allowed");
  }
};

module.exports = { isAdmin, findUserWithUsername };
