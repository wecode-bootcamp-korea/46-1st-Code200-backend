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
    const error = new Error("INVALID_REVIEW_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getAllReview = async (productId) => {
  try {
    return await appDataSource.query(
      `
      SELECT
      p.name, 
      c.name as category,
      sb.name as subcategory,
      JSON_ARRAYAGG(JSON_OBJECT(
        "userId", u.id,
        "content", r.content,
        "rating", r.rating)) AS content
      FROM products AS p
      INNER JOIN reviews AS r 
      ON r.product_id = p.id
      INNER JOIN users as u
      ON u.id = r.user_id       
      INNER JOIN subcategories as sb
      ON sb.id = p.subcategory_id 
      INNER JOIN categories as c
      ON c.id = sb.category_id
      WHERE p.id = ?
      GROUP BY p.name, c.name, sb.name
	`,
      [productId]
    );
  } catch (err) {
    console.log("🚀 -----------------------------------------------------🚀");
    console.log("🚀 | file: reviewDao.js:50 | getAllReview | err:", err);
    console.log("🚀 -----------------------------------------------------🚀");
    const error = new Error("INVALID_REVIEW_DATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createReview,
  getAllReview,
};
