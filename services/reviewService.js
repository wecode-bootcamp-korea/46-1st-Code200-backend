const reviewDao = require("../models/reviewDao");

const createReview = async (userId, productId, content, rating) => {
  return reviewDao.createReview(userId, productId, content, rating);
};

module.exports = {
  createReview,
};
