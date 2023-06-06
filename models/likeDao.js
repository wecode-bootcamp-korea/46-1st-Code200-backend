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
    return { postLike };
  } catch (err) {
    console.log("🚀 -------------------------------------------------🚀");
    console.log("🚀 | file: likeDao.js:15 | createLike | err:", err);
    console.log("🚀 -------------------------------------------------🚀");
    const error = new Error("INVALID_LIKEDATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const checkLike = async (userId, productId) => {
  try {
    const [result] = await appDataSource.query(
      `
      SELECT EXISTS (
        SELECT
        id
        FROM likes 
        WHERE users_id = ? AND product_id = ?
    ) isLiked
    `,
      [userId, productId]
    );
    return !!parseInt(result.isLiked);
  } catch (err) {
    console.log("🚀 ------------------------------------------------🚀");
    console.log("🚀 | file: likeDao.js:39 | checkLike | err:", err);
    console.log("🚀 ------------------------------------------------🚀");
    const error = new Error("DATABASE_CONNECTION_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

const deleteLikes = async (userId, productId) => {
  try {
    return await appDataSource.query(
      `
      DELETE FROM likes 
        WHERE users_id= ? AND product_id = ?
        `,
      [userId, productId]
    );
  } catch (err) {
    console.log("🚀 --------------------------------------------------🚀");
    console.log("🚀 | file: likeDao.js:58 | deleteLikes | err:", err);
    console.log("🚀 --------------------------------------------------🚀");
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

module.exports = {
  createLike,
  checkLike,
  deleteLikes,
  deleteLike,
};
