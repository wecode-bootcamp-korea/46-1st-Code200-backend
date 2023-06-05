const cartService = require("../services/cartService");

const getCartList = async (req, res) => {
  try {
    const { userId } = req.query;
    const cartsData = await cartService.getCartList(userId);

    return res.status(200).json({ data: cartsData });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;
    const cartId = req.params.cartId;

    const cart = await cartService.updateCartQuantity(userId, quantity, cartId);

    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const deleteCartList = async (req, res) => {
  try {
    const { cartId } = req.params;
    await cartService.deleteCartList(cartId);
    return res.status(204).json({ message: "CART_DELETED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const cartIds = req.body.cartIds;
    await cartService.deleteCartItems(cartIds);
    return res.status(204).json({ cartIds });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getCartList,
  updateCartQuantity,
  deleteCartList,
  deleteCartItems,
};
