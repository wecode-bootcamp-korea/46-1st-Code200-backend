const cartService = require("../services/cartService");
const { catchAsync } = require("../middleware/error");

const getCartList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartsData = await cartService.getCartList(userId);

  return res.status(200).json({ data: cartsData });
});

const updateCartQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;
  console.log(
    "🚀 --------------------------------------------------------------------------🚀"
  );
  console.log(
    "🚀 | file: cartController.js:14 | updateCartQuantity | quantity:",
    quantity
  );
  console.log(
    "🚀 --------------------------------------------------------------------------🚀"
  );
  const cartId = req.params.cartId;

  const cart = await cartService.updateCartQuantity(userId, quantity, cartId);

  return res.status(200).json({ cart });
});

const deleteCartItems = catchAsync(async (req, res) => {
  const { cartId } = req.query;
  await cartService.deleteCartItems(cartId);

  return res.status(204).send();
});

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartItems,
};
