function filterBuilder(productId, parsedSubcategoryId, minPrice, maxPrice) {
  console.log("filter builder maxPrice: ", maxPrice);
  let conditionArr = [];

  if (productId) {
    conditionArr.push(`p.id = ${productId}`);
  }
  if (parsedSubcategoryId) {
    conditionArr.push(`sc.id IN (${parsedSubcategoryId.join(",")})`);
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    conditionArr.push(`p.price BETWEEN ${minPrice} AND ${maxPrice}`);
  } else if (minPrice !== undefined) {
    conditionArr.push(`p.price >= ${minPrice}`);
  } else if (maxPrice !== undefined) {
    conditionArr.push(`p.price <= ${maxPrice}`);
  }

  let whereCondition = "";
  if (conditionArr.length > 0) {
    whereCondition = `WHERE ${conditionArr.join(" AND ")}`;
  }
  return whereCondition;
}

function orderByBuilder(orderBy) {
  let orderQuery = "";
  switch (orderBy) {
    case "priceAsc":
      orderQuery = "ORDER BY p.price ASC, p.id ASC";
      break;
    case "priceDesc":
      orderQuery = "ORDER BY p.price DESC, p.id DESC";
      break;
    case "ratingAsc":
      orderQuery = "ORDER BY avgRating ASC, p.id ASC";
      break;
    case "ratingDesc":
      orderQuery = "ORDER BY avgRating DESC, p.id DESC";
      break;
    case "incomingDesc":
      orderQuery = "ORDER BY p.incoming_date DESC, p.id ASC";
      break;
    case "incomingAsc":
      orderQuery = "ORDER BY p.incoming_date ASC, p.id ASC";
      break;
    case "best":
      orderQuery = "ORDER BY likes_count DESC";
      break;
    default:
      orderQuery = "ORDER BY p.id";
      break;
  }
  return orderQuery;
}

function limitBuilder(limit, offset) {
  if (!limit) {
    limit = 12;
  }

  if (!offset) {
    offset = 0;
  }

  return `LIMIT ${limit} OFFSET ${offset}`;
}

module.exports = {
  filterBuilder,
  orderByBuilder,
  limitBuilder,
};
