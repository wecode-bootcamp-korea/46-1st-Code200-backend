const { appDataSource } = require("./dataSource");

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
        COUNT(l.id) as likeCount,
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
       likes as l
      ON
        l.product_id = p.id
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

module.exports = {
  getProductDetail,
};
