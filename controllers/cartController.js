const cartService = require("../services/cartService");
const { catchAsync } = require("../middleware/error");

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, sizeId } = req.body;

  if (!quantity || !userId || !productId || !sizeId)
    throw new Error("KEY_ERROR");

  await cartService.createCart(userId, productId, quantity, sizeId);

  return res.status(201).json({ message: "POSTUP_SUCCESS" });
});

const getCartList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartsData = await cartService.getCartList(userId);

  return res.status(200).json({ data: cartsData });
});

const updateCartQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;
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
  createCart,
  getCartList,
  updateCartQuantity,
  deleteCartItems,
};
