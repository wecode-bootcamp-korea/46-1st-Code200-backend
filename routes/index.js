const express = require("express");

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");
const reviewRouter = require("./reviewRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/reviews", reviewRouter.router);

module.exports = router;
