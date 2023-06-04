const cartDao = require("../models/cartDao");

const getCartList = async (userId) => {
  const cartList = await cartDao.getCartList(userId);
  return cartList;
};

const updateCartQuantity = async (userId, quantity, cartId) => {
  const updateCartQuantity = await cartDao.updateCartQuantity(
    userId,
    quantity,
    cartId
  );
  return updateCartQuantity;
};

const deleteCartList = async (cartId) => {
  const deleteCartList = await cartDao.deleteCartList(cartId);
  return deleteCartList;
};

const deleteCartItems = async (cartIds) => {
  const deleteCartItems = await cartDao.deleteCartItems(cartIds);
  return deleteCartItems;
};

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartList,
  deleteCartItems,
};
