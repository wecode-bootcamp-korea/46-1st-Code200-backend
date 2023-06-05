const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/auth");
const { catchAsync } = require("../middleware/error");

const reviewController = require("../controllers/reviewController");
router.post(
  "/:productId",
  verifyJWT,
  catchAsync(reviewController.reviewSignup)
);

router.get(
  "/get/:productId",
  verifyJWT,
  catchAsync(reviewController.getAllReview)
);

module.exports = {
  router,
};
