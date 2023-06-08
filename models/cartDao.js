const { appDataSource } = require("./dataSource");

const createCart = async (userId, productId, quantity, sizeId) => {
  try {
    const create = await appDataSource.query(
      `INSERT INTO carts(
              user_id,
              product_id,
              quantity,
              size_id
          ) VALUES (?, ?, ?, ?);
          `,
      [userId, productId, quantity, sizeId]
    );
    if (!create) {
      return create;
    } else {
      const existCart = appDataSource.query(
        `
      SELECT
      *
      FROM carts
      WHERE userID =? AND productId= ? AND sizeId =?
      `,
        [userId, productId, sizeId]
      );
      if (existcart) {
        `
        SELECT
        SUM(carts.quantity)
        FROM carts
        GROUP BY productId =?
        `,
          [productId];
      }
      return existCart;
    }
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getCartList = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
      carts.id as cartId,
      carts.quantity,
      users.id userId,
      products.name,
      pi.image_url as image,
      products.price,
      sizes.name as size
      FROM carts
      INNER JOIN users ON users.id = carts.user_id
      INNER JOIN product_images pi ON pi.product_id = carts.product_id
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
  createCart,
};
