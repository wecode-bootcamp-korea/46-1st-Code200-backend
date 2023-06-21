// const { catchAsync } = require("../middleware/error");
const orderService = require("../services/orderService");
const { catchAsync } = require("../middleware/error");

const createOrderByTransaction = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, sizeId, quantity, cartId, price } = req.body;
  await orderService.createOrderByTransaction(
    userId,
    productId,
    sizeId,
    quantity,
    cartId,
    price
  );
  return res.status(200).json({ message: "ORDER_CREATED" });
});

module.exports = {
  createOrderByTransaction,
};
