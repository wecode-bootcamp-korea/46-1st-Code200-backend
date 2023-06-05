const likeDao = require("../models/likeDao");

const createLike = async (userId, productId) => {
  const createLike = await likeDao.createLike(userId, productId);
  return createLike;
};

const deleteLike = async (userId, productId) => {
  const deleteLike = await likeDao.deleteLike(userId, productId);
  return deleteLike;
};

const getCountLike = async (productId) => {
  const getCountLike = await likeDao.getCountLike(productId);
  return getCountLike;
};

module.exports = {
  createLike,
  deleteLike,
  getCountLike,
};
