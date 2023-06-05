const reviewDao = require("../models/reviewDao");

const reviewSignUp = async (userId, productId, content, rating) => {
  return reviewDao.createReview(userId, productId, content, rating);
};

const getAllReview = async (productId) => {
  return reviewDao.getAllReview(productId);
};

module.exports = {
  reviewSignUp,
  getAllReview,
};
