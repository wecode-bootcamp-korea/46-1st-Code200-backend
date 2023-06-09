const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/checkemail", userController.checkEmail);

module.exports = {
  router,
};
