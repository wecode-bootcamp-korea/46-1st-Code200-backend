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
    const error = new Error("CANT_READ_LIST");
    error.statusCode = 400;
    throw error;
  }
};

const updateCartQuantity = async (userId, quantity, cartId) => {
  try {
    return await appDataSource.query(
      `
      UPDATE carts
      SET quantity = ?
      WHERE carts.id = ? AND user_id = ?
      `,
      [quantity, cartId, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_UPDATE_CART_DATA");
    error.statusCode = 400;
    throw error;
  }
};

const deleteCartItems = async (cartId) => {
  try {
    return await appDataSource.query(
      `
      DELETE FROM carts
      WHERE carts.id IN (?)
    `,
      [cartId]
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
  deleteCartItems,
};
