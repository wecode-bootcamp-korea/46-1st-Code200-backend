const categoryService = require("../services/categoryService");

const getCategoryDetail = async (req, res) => {
  try {
    const category = await categoryService.getCategoryDetail();
    return res.status(200).json({ data: category });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getCategoryDetail,
};
