const express = require("express");

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");
const likeRouter = require("./likeRouter");
const cartRouter = require("./cartRouter");
const categoryRouter = require("./categoryRouter");
const orderRouter = require("./orderRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/reviews", reviewRouter.router);
router.use("/likes", likeRouter.router);
router.use("/carts", cartRouter.router);
router.use("/categories", categoryRouter.router);
router.use("/orders", orderRouter.router);

module.exports = router;
