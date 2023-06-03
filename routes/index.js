const express = require("express");

const router = express.Router();

const userRouter = require("../routes/userRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);

const cartRouter = require("./cartRouter");
router.use("/carts", cartRouter.router);

module.exports = router;
