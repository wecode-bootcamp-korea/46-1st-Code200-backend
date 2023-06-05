const reviewDao = require("../models/reviewDao");

const reviewSignUp = async (userId, productId, content, rating) => {
  return reviewDao.createReview(userId, productId, content, rating);
};

module.exports = {
  reviewSignUp,
};
