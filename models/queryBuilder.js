function filterBuilder(productId, subcategoryId, minPrice, maxPrice) {
  let conditionArr = [];

  if (productId) {
    conditionArr.push(`p.id = ${productId}`);
  }
  if (subcategoryId) {
    conditionArr.push(`sc.id IN (${subcategoryId})`);
  }

  if (minPrice && maxPrice) {
    conditionArr.push(`p.price BETWEEN ${minPrice} AND ${maxPrice}`);
  } else if (minPrice) {
    conditionArr.push(`p.price >= ${minPrice}`);
  } else if (maxPrice) {
    conditionArr.push(`p.price <= ${maxPrice}`);
  }

  let whereCondition = "";
  if (conditionArr.length > 0) {
    whereCondition = `WHERE ${conditionArr.join(" AND ")}`;
  }
  return whereCondition;
  //  if(conditionArr.length > 0) {
  //     whereCondition = `WHERE ${conditinonArr()}`;
  //  }
}

function orderByBuilder(orderBy) {
  let orderQuery = "";
  if (!orderBy) {
    return (orderQuery = "ORDER BY p.id");
  } else {
    orderBySelect = {
      priceAsc: "ORDER BY p.price ASC, p.id ASC",
      priceDesc: "ORDER BY p.price DESC, p.id DESC",
      ratingAsc: "ORDER BY avgRating ASC, p.id ASC",
      ratingDesc: "ORDER BY avgRating DESC, p.id DESC",
      incomingDesc: "ORDER BY p.incoming_date DESC, p.id ASC",
      incomingAsc: "ORDER BY p.incoming_date ASC, p.id ASC",
      best: "ORDER BY likes_count DESC",
    };

    return (orderQuery = orderBySelect[orderBy]);
  }
}
//   switch (orderBy) {
//     case "priceAsc":
//       orderQuery = "ORDER BY p.price ASC, p.id ASC";
//       break;
//     case "priceDesc":
//       orderQuery = "ORDER BY p.price DESC, p.id DESC";
//       break;
//     case "ratingAsc":
//       orderQuery = "ORDER BY avgRating ASC, p.id ASC";
//       break;
//     case "ratingDesc":
//       orderQuery = "ORDER BY avgRating DESC, p.id DESC";
//       break;
//     case "incomingDesc":
//       orderQuery = "ORDER BY p.incoming_date DESC, p.id ASC";
//       break;
//     case "incomingAsc":
//       orderQuery = "ORDER BY p.incoming_date ASC, p.id ASC";
//       break;
//     case "best":
//       orderQuery = "ORDER BY likes_count DESC";
//       break;
//     default:
//       orderQuery = "ORDER BY p.id";
//       break;
//   }

function limitBuilder(limit = 12, offset = 0) {
  return `LIMIT ${limit} OFFSET ${offset}`;
}

module.exports = {
  filterBuilder,
  orderByBuilder,
  limitBuilder,
};
