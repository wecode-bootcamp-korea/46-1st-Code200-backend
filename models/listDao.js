const { appDataSource } = require("./dataSource.js");

const getProductList = async (categoryId) => {
  try {
    return appDataSource.query(
      `
        SELECT
            p.id,
            p.name,
            p.price,
            AVG(r.rating) as avgRating,
            COUNT(r.rating) as countReview,
            (
                SELECT JSON_ARRAYAGG(image_url)
                FROM product_images pi
                WHERE pi.product_id = p.id
            ) as imageUrls
        FROM products p
        INNER JOIN subcategories sc ON sc.id = p.subcategory_id
        INNER JOIN categories c     ON c.id = sc.category_id AND c.id = ?
        LEFT JOIN reviews r         ON r.product_id = p.id
        GROUP BY p.id
        `,
      [categoryId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_POSTS");
    error.statusCode = 500;
    throw error;
  }
};

const getAllList = async () => {
  try {
    return await appDataSource.query(
      `SELECT
        *
      FROM users
      ORDERS LIMIT 0, 10
        `
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_POSTS");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getProductList,
  getAllList,
};
