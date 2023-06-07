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
  const parsedProductId = productId ? parseInt(productId) : undefined;
  const parsedSubcategoryId = subcategoryId
    ? Array.isArray(subcategoryId)
      ? subcategoryId.map(Number)
      : [Number(subcategoryId)]
    : undefined;
  const parsedMinPrice = minPrice ? parseInt(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? parseInt(maxPrice) : undefined;
  const parsedLimit = limit ? parseInt(limit) : undefined;
  const parsedOffset = offset ? parseInt(offset) : undefined;

  const productsData = await productService.getProductList(
    categoryId,
    parsedProductId,
    parsedMinPrice,
    parsedMaxPrice,
    parsedSubcategoryId,
    orderBy,
    parsedLimit,
    parsedOffset
  );
  return res
    .status(200)
    .json({ data: productsData, count: productsData.length });
});

module.exports = {
  getProductDetail,
  getProductList,
};
