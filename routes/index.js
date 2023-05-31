const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
router.use("/products", productRouter.router);

const reviewRouter = require("./reviewRouter");
router.use("/reviews", reviewRouter.router);

module.exports = router;
