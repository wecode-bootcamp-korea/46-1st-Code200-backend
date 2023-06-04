const categoryDao = require("../models/categoryDao");

const getCategoryDetail = async () => {
  const getCategoryDetail = await categoryDao.getCategoryDetail();
  return getCategoryDetail;
};
module.exports = {
  getCategoryDetail,
};
