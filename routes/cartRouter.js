const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
router.delete("/:cartId", cartController.deleteCartList);

module.exports = {
  router,
};
