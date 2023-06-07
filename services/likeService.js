const likeDao = require("../models/likeDao");

const createLike = async (userId, productId) => {
  return likeDao.createLike(userId, productId);
};

const deleteLike = async (userId, productId) => {
  return likeDao.deleteLike(userId, productId);
};

module.exports = {
  createLike,
  deleteLike,
};
