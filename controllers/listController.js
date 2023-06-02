const listService = require("../services/listService");

const getProductList = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const productsData = await listService.getProductList(categoryId);
    return res.status(200).json({ data: productsData });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllList = async (req, res) => {
  try {
    const postsData = await listService.getAllList();
    return res.status(200).json({ data: postsData });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  getProductList,
  getAllList,
};
