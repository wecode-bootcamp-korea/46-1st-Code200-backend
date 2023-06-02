const { appDataSource } = require("./dataSource");

const getProductDetail = async (productId) => {
  try {
    console.log(productId);
    return await appDataSource.query(
      `
      SELECT
      p.name as product_name,
      p.description as product_description,
      p.price as product_price,
      (
        SELECT JSON_ARRAYAGG(r.content)
        FROM reviews r
        WHERE r.product_id = p.id
      ) as content,
      (
        SELECT JSON_ARRAYAGG(pi.image_url)
        FROM product_images pi
        WHERE pi.product_id = p.id
      ) as imageUrls,
      sb.name as subcategory,
      c.name as category
    FROM products as p
    LEFT JOIN subcategories as sb ON sb.id = p.subcategory_id
    LEFT JOIN categories as c ON c.id = sb.category_id
    WHERE p.id = ?
	`,
      [productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProductDetail,
};
