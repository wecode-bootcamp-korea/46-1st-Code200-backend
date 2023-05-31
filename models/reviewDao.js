const { appDataSource } = require("./dataSource");

const createReview = async (userId, productId, content, rating) => {
  try {
    return await appDataSource.query(
      `
            INSERT INTO reviews (
                user_id,
                product_id,
                content,
                rating
            ) VALUES (?, ?, ?, ?)
            `,
      [userId, productId, content, rating]
    );
  } catch (err) {
    console.log("1111111:", err);
    const error = new Error("INVALID_REVIEW_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createReview,
};
