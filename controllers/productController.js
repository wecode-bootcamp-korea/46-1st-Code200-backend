const productService = require("../services/productService");

const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await productService.getProductDetail(productId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProductDetail,
};
