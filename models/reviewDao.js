const { appDataSource } = require("./dataSource");

const createReview = async (userId, productId, content, rating) => {
  console.log(
    "🚀 ------------------------------------------------------------------------------------------------------------------🚀"
  );
  console.log(
    "🚀 | file: reviewDao.js:4 | createReview | userId, productId, content, rating:",
    userId,
    productId,
    content,
    rating
  );
  console.log(
    "🚀 ------------------------------------------------------------------------------------------------------------------🚀"
  );

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
