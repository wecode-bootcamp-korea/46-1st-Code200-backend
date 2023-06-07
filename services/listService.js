const listDao = require("../models/listDao");

const getProductList = async (
  categoryId,
  productId,
  minPrice,
  maxPrice,
  subcategoryId,
  orderBy,
  limit,
  offset
) => {
  const getList = await listDao.getProductList(
    categoryId,
    productId,
    minPrice,
    maxPrice,
    subcategoryId,
    orderBy,
    limit,
    offset
  );
  return getList;
};

module.exports = {
  getProductList,
};
