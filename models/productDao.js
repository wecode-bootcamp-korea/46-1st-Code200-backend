const { appDataSource } = require("./dataSource");

const getProductDetail = async (productId) => {
  try {
    return await appDataSource.query(
      `
      SELECT
      p.name, 
      p.price, 
      p.description, 
      JSON_OBJECT("imageUrl", pi.image_url) as image,
      c.name as category,
      sb.name as subcategory,
      JSON_ARRAYAGG(JSON_OBJECT("content", r.content)) AS content,
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
