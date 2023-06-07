const productService = require("../services/productService");

const getProductDetail = async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getProductDetail(productId);
  return res.status(200).json(result);
};

module.exports = {
  getProductDetail,
};
