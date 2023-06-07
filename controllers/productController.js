const productService = require("../services/productService");
const { catchAsync } = require("../middleware/error");

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user?.id;
  const product = await productService.getProductDetail(productId, userId);
  return res.status(200).json({ product });
});

module.exports = {
  getProductDetail,
};
