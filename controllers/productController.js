const productService = require('../services/productService');

const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductDetail(productId);
    return res.status(200).json({ data: product });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const { sort } = req.query;
    const productList = await productService.getProductList(sort);
    return res.status(200).json({ data: productList });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProductDetail,
  getProductList,
};
