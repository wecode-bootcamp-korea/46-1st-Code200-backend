const express = require("express");

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");
const likeRouter = require("./likeRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/likes", likeRouter.router);

module.exports = router;
