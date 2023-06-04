const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/auth");
const { catchAsync } = require("../middleware/error");

const cartController = require("../controllers/cartController");
router.get("", verifyJWT, catchAsync(cartController.getCartList));
router.patch(
  "/:cartId",
  verifyJWT,
  catchAsync(cartController.updateCartQuantity)
);
router.delete("/:cartId", verifyJWT, catchAsync(cartController.deleteCartList));
router.patch("", catchAsync(cartController.deleteCartItems));

module.exports = {
  router,
};
