const productDao = require("../models/productDao");

const getProductDetail = async (productId, userId) => {
  return productDao.getProductDetail(productId, userId);
};

module.exports = {
  getProductDetail,
};
