const { appDataSource } = require("./dataSource");
const builder = require("./queryBuilder");

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
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 400;
    throw error;
  }
};

const getProductList = async (
  categoryId,
  productId,
  minPrice,
  maxPrice,
  parsedSubcategoryId,
  orderBy,
  limit,
  offset
) => {
  try {
    const whereCondition = builder.filterBuilder(
      productId,
      parsedSubcategoryId,
      minPrice,
      maxPrice
    );
    console.log(whereCondition);
    const orderQuery = builder.orderByBuilder(orderBy);
    const limitQuery = builder.limitBuilder(limit, offset);
    const [products, total] = await Promise.all([
      appDataSource.query(
        `
          SELECT
              p.id as productId,
              p.name,
              round(p.price, 0) as price,
              p.incoming_date,
              sc.id as subcategory_id,
              sc.name as subcategory_name,
              round(AVG(r.rating), 2) as avgRating,
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
          ${whereCondition}
          GROUP BY p.id
          ${orderQuery}
          ${limitQuery}
          `,
        [categoryId]
      ),
      appDataSource.query(
        `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      INNER JOIN subcategories sc ON sc.id = p.subcategory_id
      INNER JOIN categories c     ON c.id = sc.category_id AND c.id = ?
      ${whereCondition}
    `,
        [categoryId]
      ),
    ]);
    console.log(Promise.all);
    console.log(total[0].total);
    console.log(total);
    return { products, total: total[0].total };
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_POSTS");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProductDetail,
  getProductList,
};
