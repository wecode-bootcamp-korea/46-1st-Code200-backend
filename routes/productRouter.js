const express = require("express");

const productController = require("../controllers/productController");
const { optionalVerifyJWT } = require("../middleware/auth");

const router = express.Router();

router.get("", optionalVerifyJWT, productController.getProductList);
router.get(
  "/:productId",
  optionalVerifyJWT,
  productController.getProductDetail
);

module.exports = {
  router,
};
