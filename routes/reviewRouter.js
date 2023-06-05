const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

const { verifyJWT } = require("../middleware/auth");

router.post("/:productId", verifyJWT, reviewController.reviewSignup);

module.exports = {
  router,
};
