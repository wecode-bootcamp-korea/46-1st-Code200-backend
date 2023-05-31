const productService = require("../services/productService");

const detailProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productID = await productService.getDetailproduct(productId);
    return res.status(201).json({ data: productID });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  detailProduct,
};
