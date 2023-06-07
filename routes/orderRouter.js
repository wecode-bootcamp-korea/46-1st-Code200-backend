const express = require("express");
const orderService = require("../services/orderService"); 
const { verifyJWT } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyJWT, async (req, res) => {
  console.log("User ID:", req.user.id);
  console.log("Cart Items:", req.body.cartItems);
  try {
    const result = await orderService.createOrder(
      req.user.id,
      req.body.cartItems
    );
    res.status(201).json({ orderId: result });
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

module.exports = router;
