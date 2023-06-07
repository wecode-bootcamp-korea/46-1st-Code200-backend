const express = require("express");

const { verifyJWT } = require("../middleware/auth");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.post("/:productId", verifyJWT, reviewController.createReview);

module.exports = {
  router,
};
