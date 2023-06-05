const express = require("express");

const { verifyJWT } = require("../middleware/auth");

const router = express.Router();

const cartController = require("../controllers/cartController");
router.get("", verifyJWT, cartController.getCartList);
router.patch("/:cartId", verifyJWT, cartController.updateCartQuantity);
router.delete("", verifyJWT, cartController.deleteCartItems);

module.exports = {
  router,
};
