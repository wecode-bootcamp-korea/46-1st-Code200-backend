const cartService = require("../services/cartService");
const { catchAsync } = require("../middleware/error");

const getCartList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartsData = await cartService.getCartList(userId);
  return res.status(200).json({ data: cartsData });
});

const updateCartQuantity = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;
    const cartId = req.params.cartId;

    const cart = await cartService.updateCartQuantity(userId, quantity, cartId);

    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
});

const deleteCartItems = catchAsync(async (req, res) => {
  try {
    const { cartId } = req.query;
    await cartService.deleteCartItems(cartId);
    return res.status(204).send();
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartItems,
};
