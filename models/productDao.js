const { appDataSource } = require("./dataSource");

const getProductDetail = async (productId) => {
  try {
    const [product] = await appDataSource.query(
      `
      SELECT
      p.name, 
      p.price, 
      p.description,
      (
        SELECT ROUND(AVG(r.rating), 1) FROM reviews WHERE r.product_id = p.id
      )as average,
      JSON_ARRAYAGG(pi.image_url) as imageUrls,
      c.name as category,
      sb.name as subcategory
      FROM products AS p
      LEFT JOIN reviews as r
        ON r.product_id = p.id
      INNER JOIN product_images as pi
        ON pi.product_id = p.id
      INNER JOIN subcategories as sb
        ON sb.id = p.subcategory_id 
      INNER JOIN categories as c
        ON c.id = sb.category_id
      WHERE p.id = ?
      GROUP BY p.id
	  `,
      [productId]
    );

    const reviews = await appDataSource.query(
      `
        SELECT 
          u.id as userId,
          u.name as userName,
          r.content as content,
          r.rating as rating
        FROM reviews r
        INNER JOIN users u ON u.id = r.user_id
        WHERE r.product_id = ?
    `,
      [productId]
    );

    return { product, reviews };
  } catch (err) {
    console.log(
      "🚀 ----------------------------------------------------------🚀"
    );
    console.log("🚀 | file: productDao.js:48 | getProductDetail | err:", err);
    console.log(
      "🚀 ----------------------------------------------------------🚀"
    );
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getProductDetail,
};
