const { appDataSource } = require("./dataSource");

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
  deleteCartList,
};
