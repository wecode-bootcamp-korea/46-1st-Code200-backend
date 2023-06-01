const express = require("express");
const listController = require("../controllers/listController");
const router = express.Router();

router.get("/list", listController.getAllList);
router.get("/", listController.getList);

module.exports = {
  router,
};
