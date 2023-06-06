const { appDataSource } = require('./dataSource');

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
    const error = new Error('INVALID_DETAILDATA');
    error.statusCode = 400;
    throw error;
  }
};

const getProductList = async (sort) => {
  let orderQuery;
  console.log(sort);
  switch (sort) {
    case 'new':
      orderQuery = `ORDER BY p.create_at DESC`;
      break;
    case 'review':
      orderQuery = `ORDER BY countReview ASC`;
      break;
    default:
      orderQuery = `ORDER BY p.id ASC`;
  }

  try {
    const productList = await appDataSource.query(
      `
      SELECT
        p.id,
        p.name,
        p.price,
        (FLOOR(RAND() * (4 - 0 + 1))+0.5) as avgRating,
        (FLOOR(RAND() * (100 - 0 + 1))) as countReview,
        JSON_ARRAYAGG(
          pi.image_url
        ) as productUrls,
        p.create_at as createAt
      FROM products p
      JOIN product_images pi ON pi.product_id = p.id
      GROUP BY p.id
      ${orderQuery}
	  `
    );

    return productList;
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DETAILDATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProductDetail,
  getProductList,
};
