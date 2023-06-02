const listDao = require("../models/listDao");

const getProductList = async (categoryId) => {
  const getProductList = await listDao.getProductList(categoryId);
  return getProductList;
};

const getAllList = async () => {
  const getPost = await listDao.getAllList();
  return getPost;
};

module.exports = {
  getProductList,
  getAllList,
};
