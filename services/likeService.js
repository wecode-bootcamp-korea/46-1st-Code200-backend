const likeDao = require("../models/likeDao");

const createLike = async (userId, productId) => {
  let createOrDelete;
  try {
    const isLiked = await likeDao.checkLike(userId, productId);

    if (isLiked) {
      createOrDelete = "Deleted Like";
      await likeDao.deleteLike(userId, productId);

      return createOrDelete;
    }

    createOrDelete = "Created Like";
    await likeDao.createLike(userId, productId);
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }

  return createOrDelete;
};

const deleteLike = async (userId, productId) => {
  const deleteLike = await likeDao.deleteLike(userId, productId);
  return deleteLike;
};

module.exports = {
  createLike,
  deleteLike,
};
