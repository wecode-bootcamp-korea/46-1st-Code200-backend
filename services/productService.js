const productDao = require("../models/productDao");

const getDetailproduct = async (productId) => {
  const getdetailProduct = await productDao.getdetailProduct(productId);
  return getdetailProduct;
};

module.exports = {
  getDetailproduct,
};
