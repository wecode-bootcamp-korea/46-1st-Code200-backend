const orderDao = require("../models/orderDao");

const createOrder = async (userId, cartItems) => {
  try {
    const orderId = await orderDao.transferFromCartToOrder(userId, cartItems);
    return orderId;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  createOrder,
};