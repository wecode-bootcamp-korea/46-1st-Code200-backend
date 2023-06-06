const cartDao = require('../models/cartDao');

const getCartList = async (userId) => {
  return cartDao.getCartList(userId);
};

const updateCartQuantity = async (userId, quantity, cartId) => {
  return cartDao.updateCartQuantity(userId, quantity, cartId);
};

const deleteCartItems = async (cartId) => {
  return cartDao.deleteCartItems(cartId);
};

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartItems,
};
