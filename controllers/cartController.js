const cartService = require("../services/cartService");

const deleteCartList = async (req, res) => {
  try {
    const { cartId } = req.params;
    await cartService.deleteCartList(cartId);
    return res.status(204).json({ message: "CART_DELETED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  deleteCartList,
};
