const express = require("express");

const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/categories", categoryRouter.router);

module.exports = router;
