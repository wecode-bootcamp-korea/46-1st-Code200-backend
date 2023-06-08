const productService = require("../services/productService");
const { catchAsync } = require("../middleware/error");

const getProductList = catchAsync(async (req, res) => {
  const userId = req.user?.id;
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
    offset,
    userId
  );
  return res.status(200).json({ data: productsData });
});

const getProductDetail = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user?.id;

  const result = await productService.getProductDetail(productId, userId);
  return res.status(200).json(result);
};

module.exports = {
  getProductDetail,
  getProductList,
};
