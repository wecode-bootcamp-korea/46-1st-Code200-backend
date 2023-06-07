const productService = require("../services/productService");
const { catchAsync } = require("../middleware/error");

const getProductDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getProductDetail(productId);
  return res.status(200).json({ data: product });
});

const getProductList = catchAsync(async (req, res) => {
  const {
    categoryId,
    productId,
    minPrice,
    maxPrice,
    subcategoryId,
    orderBy,
    limit,
    offset,
  } = req.query;

  const productsData = await productService.getProductList(
    categoryId,
    productId,
    minPrice,
    maxPrice,
    subcategoryId,
    orderBy,
    limit,
    offset
  );
  return res.status(200).json({ data: productsData });
});

module.exports = {
  getProductDetail,
  getProductList,
};
