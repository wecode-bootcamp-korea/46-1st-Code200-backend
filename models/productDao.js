const { appDataSource } = require("./dataSource");
const builder = require("./queryBuilder");

const getProductDetail = async (productId, userId) => {
  try {
    const product = await appDataSource.query(
      `
      SELECT
        p.name,
        p.price,
        p.description,
        JSON_ARRAYAGG(pi.image_url) as imageUrls,
        (SELECT ROUND(AVG(reviews.rating), 1) FROM reviews WHERE reviews.product_id = p.id) as average,
        (SELECT COUNT(l.id) FROM likes as l WHERE l.product_id = p.id) as likeCount,
        (ul.id IS NOT NULL) as isLiked,
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
      LEFT JOIN
        likes as ul
      ON
        ul.product_id = p.id AND ul.users_id = ?
      WHERE
        p.id = ?
	  `,
      [userId, productId]
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
    const reviewCount = reviews.length;

    product[0].isLiked = !!parseInt(product[0].isLiked);

    return { product, reviews, reviewCount };
  } catch (err) {
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 400;
    throw err;
  }
};

const getProductList = async (
  categoryId,
  productId,
  minPrice,
  maxPrice,
  subcategoryId,
  orderBy,
  limit,
  offset,
  userId
) => {
  try {
    const whereCondition = builder.filterBuilder(
      productId,
      subcategoryId,
      minPrice,
      maxPrice
    );
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
              (SELECT COUNT(l.id) FROM likes as l WHERE l.product_id = p.id) as likeCount,
              (ul.id IS NOT NULL) as isLiked,
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
          LEFT JOIN likes as ul       ON ul.product_id = p.id AND ul.users_id = ?
          ${whereCondition}
          GROUP BY p.id
          ${orderQuery}
          ${limitQuery}
          `,
        [categoryId, userId]
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

    for (let product of products) {
      product.isLiked = !!parseInt(product.isLiked);
    }

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
