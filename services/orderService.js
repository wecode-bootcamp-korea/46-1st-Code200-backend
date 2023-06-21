const orderDao = require("../models/orderDao");

const createOrderByTransaction = async (
  userId,
  productId,
  sizeId,
  quantity,
  cartId,
  price
) => {
  return orderDao.createOrderByTransaction(
    userId,
    productId,
    sizeId,
    quantity,
    cartId,
    price
  );
};

module.exports = {
  createOrderByTransaction,
};
