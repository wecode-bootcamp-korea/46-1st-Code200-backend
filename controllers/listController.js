const listService = require("../services/listService");

const getProductList = async (req, res) => {
  try {
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

    const productsData = await listService.getProductList(
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
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  getProductList,
};
