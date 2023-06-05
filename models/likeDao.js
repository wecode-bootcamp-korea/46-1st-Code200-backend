const { appDataSource } = require("./dataSource");

const createLike = async (userId, productId) => {
  try {
    const postLike = await appDataSource.query(
      `INSERT INTO likes(
            users_id,
            product_id
        ) VALUES (?, ?);
        `,
      [userId, productId]
    );
    const countLike = await appDataSource.query(
      `
      SELECT
      COUNT(product_id) as count
      FROM likes as l
      WHERE l.product_id = ?
      `,
      [productId]
    );
    const count = parseInt(countLike[0]["count"]);
    return { postLike, count };
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
