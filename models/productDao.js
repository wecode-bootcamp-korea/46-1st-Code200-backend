const { appDataSource } = require("./dataSource");

const getProductDetail = async (productId) => {
  try {
    return await appDataSource.query(
      `
      SELECT
      p.name,
      p.price,
      p.description,
      JSON_ARRAYAGG(pi.image_url) as imageUrls,
      (SELECT ROUND(AVG(reviews.rating), 1) FROM reviews WHERE reviews.product_id = p.id) as average,
      sb.name as subcategory,
      c.name as category
    FROM products AS p
    INNER JOIN
      product_images AS pi
    ON
      pi.product_id = p.id
    INNER JOIN 
      subcategories as sb
    ON 
      sb.id = p.subcategory_id 
    INNER JOIN 
      categories as c
    ON 
      c.id = sb.category_id
    WHERE
      p.id = ?
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
