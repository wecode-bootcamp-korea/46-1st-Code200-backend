const express = require("express");
const router = express.Router();

const productRouter = require("./productRouter");
router.use("/products", productRouter.router);

const reviewRouter = require("./reviewRouter");
router.use("/reviews", reviewRouter.router);

const likeRouter = require("./likeRouter");
router.use("/likes", likeRouter.router);

module.exports = router;
