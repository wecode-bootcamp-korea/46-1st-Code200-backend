const express = require("express");

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/carts", cartRouter.router);

module.exports = router;
