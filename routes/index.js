const express = require("express");
const router = express.Router();

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/carts", cartRouter.router);

module.exports = router;
