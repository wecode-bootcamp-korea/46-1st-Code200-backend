const { appDataSource } = require("./dataSource.js");

const createOrder = async (userId, total_price) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO orders(
                user_id,
                total_price,
                order_status_id
            ) VALUES (?, ?, ?);
            `,
      [userId, total_price, 1]
    );

    return result.insertId;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const createOrderItem = async (orderId, productId, sizeId, quantity) => {
  try {
    return await appDataSource.query(
      `INSERT INTO order_items(
                order_id,
                product_id,
                size_id,
                quantity
            ) VALUES (?, ?, ?, ?);
            `,
      [orderId, productId, sizeId, quantity]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const transferFromCartToOrder = async (userId) => {
  try {
    const cartItems = await getCartList(userId);

    let total_price = 0;
    for (const item of cartItems) {
      total_price += item.price * item.quantity;
    }

    const orderId = await createOrder(userId, total_price);

    for (const item of cartItems) {
      await createOrderItem(
        orderId,
        item.productId,
        item.sizeId,
        item.quantity
      );
    }

    await emptyCart(userId);

    return orderId;
  } catch (err) {
    const error = new Error("TRANSFER_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  transferFromCartToOrder: createOrder,
  createOrderItem,
};
