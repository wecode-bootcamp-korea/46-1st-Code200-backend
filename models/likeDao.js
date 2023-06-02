const { appDataSource } = require("./dataSource");

const clickLike = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes(
            user_id,
            product_id
        ) VALUES (?, ?);
        `,
      [userId, productId]
    );
  } catch (err) {
    const error = new Error("INVALID_LIKEDATA_INPUT");
    error.statusCode = 500;
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

module.exports = {
  createLike,
  deleteLike,
};
