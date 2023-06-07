const orderService = require("../services/orderService");
const { catchAsync } = require("../middleware/error");

const transferFromCartToOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const orderId = await orderService.transferFromCartToOrder(userId);

  console.log("User ID:", userId);
  console.log("Cart Items:", orderId);

  res.status(200).json({
    message: "Successfully transferred items from cart to order",
    orderId: orderId,
  });
});

module.exports = {
  transferFromCartToOrder,
};
