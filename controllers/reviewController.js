const reviewService = require("../services/reviewService");
const { catchAsync } = require("../middleware/error");

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { content, rating } = req.body;
  await reviewService.createReview(userId, productId, content, rating);
  return res.status(201).json({ message: "REVIEW_POSTED" });
});

module.exports = {
  createReview,
};
