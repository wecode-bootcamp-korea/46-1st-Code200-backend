const reviewDao = require("../models/reviewDao");

const reviewSignUp = async (userId, productId, content, rating) => {
  const createReview = await reviewDao.createReview(
    userId,
    productId,
    content,
    rating
  );
  return createReview;
};

const getAllReview = async (productId) => {
  const getAllReview = await productDao.getAllReview(productId);
  return getAllReview;
};

module.exports = {
  reviewSignUp,
};
