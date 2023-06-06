const likeDao = require("../models/likeDao");

const createLike = async (userId, productId) => {
  try {
    const isLiked = await likeDao.checkLike(userId, productId);
    let likeCount;

    if (isLiked) {
      await likeDao.deleteLike(userId, productId);
      likeCount = await likeDao.countLikes(productId);
    } else {
      await likeDao.createLike(userId, productId);
      likeCount = await likeDao.countLikes(productId);
    }

    return [likeCount, !isLiked];
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createLike,
};
