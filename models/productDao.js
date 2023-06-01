const { appDataSource } = require("./dataSource");

const getProductDetail = async (productId) => {
  try {
    return await appDataSource.query(
      `
      SELECT 
      p.name, 
      p.price, 
      p.description, 
      JSON_ARRAYAGG(
        JSON_OBJECT("imageUrl", pi.image_url)) as image,
      sb.id as subcategory,
      GROUP_CONCAT(r.content) AS content, 
      AVG(r.rating) AS average_rating
      FROM products AS p
      LEFT JOIN reviews AS r 
      ON r.product_id = p.id
      LEFT JOIN product_images as pi
      ON pi.product_id = p.id 
      LEFT JOIN categories as c
      ON c.id
      LEFT JOIN subcategories as sb
      ON sb.id = p.subcategory_id 
      WHERE p.id = 0
      GROUP BY p.name, p.price, p.description, pi.image_url
	`,
      [productId]
    );
  } catch (err) {
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getProductDetail,
};
