const express = require("express");

const { verifyJWT } = require("../middleware/auth");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("", verifyJWT, cartController.createCart);
router.get("", verifyJWT, cartController.getCartList);
router.patch("/:cartId", verifyJWT, cartController.updateCartQuantity);
router.delete("", verifyJWT, cartController.deleteCartItems);

module.exports = {
  router,
};
