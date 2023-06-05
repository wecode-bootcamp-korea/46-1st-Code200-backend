const categoryDao = require("../models/categoryDao");

const getCategoryDetail = async () => {
  return categoryDao.getCategoryDetail();
};

module.exports = {
  getCategoryDetail,
};
