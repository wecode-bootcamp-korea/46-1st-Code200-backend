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

const getProductDetail = async (productId) => {
  try {
    return await appDataSource.query(
      `
      SELECT
      p.name, 
      c.name as category,
      sb.name as subcategory,
      JSON_ARRAYAGG(JSON_OBJECT(
        "userId", u.id,
        "content", r.content)) AS content,
      ROUND(AVG(r.rating),1) AS average_rating
      FROM products AS p
      INNER JOIN reviews AS r 
      ON r.product_id = p.id
      INNER JOIN product_images as pi
      ON pi.product_id = p.id       
      INNER JOIN subcategories as sb
      ON sb.id = p.subcategory_id 
      INNER JOIN categories as c
      ON c.id = sb.category_id
      WHERE p.id = ?
      GROUP BY p.name, p.price, p.description, pi.image_url, c.name, sb.name
	`,
      [productId]
    );


module.exports = {
  createReview,
};
