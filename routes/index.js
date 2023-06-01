const express = require("express");
const listRouter = require("./listRouter");
const router = express.Router();

router.use("/products", listRouter.router);

module.exports = router;
