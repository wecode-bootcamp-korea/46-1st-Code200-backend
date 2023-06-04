const { appDataSource } = require("./dataSource");

const getCartList = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
      carts.id as cartId,
      carts.quantity,
      users.id userId,
      products.name,
      products.price,
      sizes.name as size
    FROM carts
      INNER JOIN users ON users.id = carts.user_id
      LEFT JOIN products ON products.id = carts.product_id
      LEFT JOIN sizes ON carts.size_id = sizes.id
      WHERE users.id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_POSTS");
    error.statusCode = 400;
    throw error;
  }
};

const updateCartQuantity = async (userId, quantity, cartId) => {
  try {
    return await appDataSource.query(
      `
      UPDATE carts
      SET quantity = ${quantity}
      WHERE carts.id = ${cartId} AND user_id = ${userId}
      `
    );
  } catch (err) {
    const error = new Error("INVALID_UPDATE_CART_DATA");
    error.statusCode = 400;
    throw error;
  }
};

const deleteCartList = async (cartId) => {
  try {
    return await appDataSource.query(
      `
      DELETE FROM carts
      WHERE carts.id = ?
    `,
      [cartId]
    );
  } catch (err) {
    const error = new Error("INVALID_DELETE_CART_DATA");
    error.statusCode = 400;
    throw error;
  }
};

const deleteCartItems = async (cartIds) => {
  try {
    const result = await appDataSource.query(
      `
      DELETE FROM carts
      WHERE carts.id IN (${cartIds.join()})
    `
    );
  } catch (err) {
    const error = new Error("INVALID_DELETE_CART_DATA");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartList,
  deleteCartItems,
};
