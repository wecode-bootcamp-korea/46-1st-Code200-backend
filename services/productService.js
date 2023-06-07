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
   return productDao.getProductList(
    categoryId,
    productId,
    minPrice,
    maxPrice,
    subcategoryId,
    orderBy,
    limit,
    offset
  );
};

module.exports = {
  getProductDetail,
  getProductList,
};
