const express = require("express");

const router = express.Router();

<<<<<<< HEAD
const userRouter = require("../routes/userRouter");

router.use("/users", userRouter.router);
=======
const productRouter = require("./productRouter");
router.use("/products", productRouter.router);
>>>>>>> main

module.exports = router;
