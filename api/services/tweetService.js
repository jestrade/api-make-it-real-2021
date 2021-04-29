const Tweet = require("../tweets/model");

const findUserByTweetId = async (tweetId) => {
  try {
    const userIdFound = await Tweet.findOne({ _id: tweetId });
    return userIdFound.user._id;
  } catch (error) {
    return false;
  }
};

module.exports = { findUserByTweetId };
