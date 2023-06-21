const { v4 } = require("uuid");
const { query } = require("express");
const { appDataSource } = require("./dataSource");

const createOrderByTransaction = async (
  userId,
  productId,
  sizeId,
  quantity,
  cartId,
  price
) => {
  const queryRunner = appDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [getUserInfo] = await queryRunner.query(
      `
      SELECT
      id,
      name,
      phone_number,
      address,
      address_detail,
      point
      FROM users
      WHERE id =?
      `,
      [userId]
    );
    const [productQuantity] = await appDataSource.query(
      `
      SELECT
      quantity
      FROM products
      WHERE id =?
      `,
      [productId]
    );
    if (productQuantity < quantity) {
      throw new Error({ message: "PRODUCT_QUANTITY_IS_NOT_ENOUGH" });
    }

    const updateProducts = await queryRunner.query(
      `
        UPDATE products
        SET quantity = ? - ?
        WHERE products.id = ?
        `,
      [productQuantity, quantity, productId]
    );
    const userPoint = getUserInfo.point;
    if (getUserInfo.point < price) {
      throw new Error({ message: "USER_POINT_IS_NOT_ENOUGH" });
    }

    const updateUserPoint = await queryRunner.query(
      `
                UPDATE users
                SET point = ? - ?
                WHERE users.id =?
                `,
      [userPoint, price, userId]
    );
    const updateCartItems = await queryRunner.query(
      `
                  DELETE FROM carts
                  WHERE carts.id = ?
                  `,
      [cartId]
    );

    const uuid = () => {
      const tokens = v4().split("-");
      return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
    };

    uuid();
    const orderNumber = uuid();
    const username = getUserInfo.name;
    const orderStatusId = 1;
    const totalPrice = price;
    const createOrder = await queryRunner.query(
      `
      INSERT INTO orders
      (
        name,
        order_number,
        user_id,
        order_status_id,
        total_price
        )
        VALUES (?,?,?,?,?)
        `,
      [username, orderNumber, userId, orderStatusId, totalPrice]
    );
    const orderId = createOrder.insertId;
    const createOrderItems = await queryRunner.query(
      `
      INSERT INTO order_items
      (
        order_id,
        product_id,
        size_id,
        quantity
        )
        VALUES(?,?,?,?)`,
      [orderId, productId, sizeId, quantity]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createOrderByTransaction,
};
