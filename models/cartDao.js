const { appDataSource } = require("./dataSource");

const updateCartQuantity = async (quantity, cartId, userId) => {
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
    console.log(err);
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

module.exports = {
  updateCartQuantity,
  deleteCartList,
};
