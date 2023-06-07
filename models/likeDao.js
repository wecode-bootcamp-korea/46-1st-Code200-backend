const { appDataSource } = require("./dataSource");

const createLike = async (userId, productId) => {
  try {
    return appDataSource.query(
      `INSERT IGNORE INTO likes (
        users_id,
        product_id
      ) VALUES (?, ?)`,
      [userId, productId]
    );
  } catch (err) {
    const error = new Error("INVALID_LIKE_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const deleteLike = async (userId, productId) => {
  try {
    return appDataSource.query(
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
