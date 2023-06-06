const { appDataSource } = require("./dataSource");

const createLike = async (userId, productId) => {
  try {
    const postLike = await appDataSource.query(
      `INSERT INTO likes (
        users_id,
        product_id
      ) VALUES (?, ?)`,
      [userId, productId]
    );
    return { postLike };
  } catch (err) {
    const error = new Error("INVALID_LIKEDATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const checkLike = async (userId, productId) => {
  try {
    const [result] = await appDataSource.query(
      `
      SELECT 
      EXISTS 
      (
        SELECT id FROM likes 
        WHERE users_id = ? AND product_id = ?
      ) as isLiked
    `,
      [userId, productId]
    );
    return !!parseInt(result.isLiked);
  } catch (err) {
    const error = new Error("DATABASE_CONNECTION_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

const deleteLike = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `
      DELETE FROM likes
      WHERE users_id = ? AND product_id = ?
    `,
      [userId, productId]
    );
  } catch (err) {
    const error = new Error("INVALID_LIKE_DELETE");
    error.statusCode = 400;
    throw error;
  }
};

const countLikes = async (productId) => {
  try {
    const [result] = await appDataSource.query(
      `
      SELECT COUNT(*) as likeCount 
      FROM likes 
      WHERE product_id = ?
      `,
      [productId]
    );
    return result.likeCount;
  } catch (err) {
    const error = new Error("DATABASE_CONNECTION_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createLike,
  checkLike,
  deleteLike,
  countLikes,
};
