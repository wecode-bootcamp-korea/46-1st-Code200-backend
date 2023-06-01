const productDao = require("../models/productDao");

const getProductDetail = async (productId) => {
  const getProductDetail = await productDao.getProductDetail(productId);
  return getProductDetail;
};

module.exports = {
  getProductDetail,
};
