const express = require("express");
const listController = require("../controllers/listController");
const router = express.Router();

router.get("", listController.getProductList);

module.exports = {
  router,
};
