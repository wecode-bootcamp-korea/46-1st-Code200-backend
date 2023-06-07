const productDao = require("../models/productDao");

const getProductDetail = async (productId) => {
  const getProductDetail = await productDao.getProductDetail(productId);
  return getProductDetail;
};

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
  const getList = await productDao.getProductList(
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
  getProductDetail,
  getProductList,
};
