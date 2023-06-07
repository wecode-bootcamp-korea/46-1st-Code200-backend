const express = require("express");
const { verifyJWT } = require("../middleware/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("", verifyJWT, orderController.createOrderByTransaction);

module.exports = {
  router,
};
