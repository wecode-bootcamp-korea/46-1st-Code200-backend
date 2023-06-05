const categoryService = require("../services/categoryService");
const { catchAsync } = require("../middleware/error");

const getCategoryDetail = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryDetail();
  return res.status(200).json({ data: category });
});

module.exports = {
  getCategoryDetail,
};
