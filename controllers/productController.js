const productService = require("../services/productService");

const getProductDetail = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user?.id;

  const result = await productService.getProductDetail(productId, userId);
  return res.status(200).json(result);
};

module.exports = {
  getProductDetail,
};
