const likeDao = require("../models/likeDao");

const createLike = async (userId, productId) => {
  const createLike = await likeDao.createLike(userId, productId);
  return createLike;
};

const deleteLike = async (userId, productId) => {
  const deleteLike = await likeDao.deleteLike(userId, productId);
  return deleteLike;
};

module.exports = {
  createLike,
  deleteLike,
};
