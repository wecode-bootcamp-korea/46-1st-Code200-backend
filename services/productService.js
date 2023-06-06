const productDao = require('../models/productDao');

const getProductDetail = async (productId) => {
  const getProductDetail = await productDao.getProductDetail(productId);
  return getProductDetail;
};

const getProductList = async (sort) => {
  const productList = await productDao.getProductList(sort);
  return productList;
};
module.exports = {
  getProductDetail,
  getProductList,
};
