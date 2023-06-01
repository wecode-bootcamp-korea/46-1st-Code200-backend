const listDao = require("../models/listDao");

const getList = async (categoryId) => {
  const getList = await listDao.getList(categoryId);
  return getList;
};

const getAllList = async () => {
  const getPost = await listDao.getAllList();
  return getPost;
};

module.exports = {
  getList,
  getAllList,
};
