const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
router.use("/products", productRouter.router);

const cartRouter = require("./cartRouter");
router.use("/carts", cartRouter.router);

module.exports = router;
