const { appDataSource } = require('./dataSource');

const getProductDetail = async (productId) => {
  try {
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
