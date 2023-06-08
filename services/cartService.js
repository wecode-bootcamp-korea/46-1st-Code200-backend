const cartDao = require("../models/cartDao");

const createCart = async (userId, productId, quantity, sizeId) => {
  const createCart = await cartDao.createCart(
    userId,
    productId,
    quantity,
    sizeId
  );
  return createCart;
};

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
  createCart,
  getCartList,
  updateCartQuantity,
  deleteCartItems,
};
