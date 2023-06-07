const express = require("express");
const listRouter = require("./listRouter");
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("../routes/userRouter");
const categoryRouter = require("./categoryRouter");

const router = express.Router();

router.use("/products", listRouter.router);
router.use("/carts", cartRouter.router);
router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/categories", categoryRouter.router);

module.exports = router;
