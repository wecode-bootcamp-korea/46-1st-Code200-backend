const cartDao = require("../models/cartDao");

const deleteCartList = async (cartId) => {
  const deleteCartList = await cartDao.deleteCartList(cartId);
  return deleteCartList;
};

module.exports = {
  deleteCartList,
};
