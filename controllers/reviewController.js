const reviewService = require("../services/reviewService");
const { catchAsync } = require("../middleware/error");

const reviewSignup = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.query;
    const { content, rating } = req.body;
    await reviewService.reviewSignUp(userId, productId, content, rating);
    return res.status(201).json({ message: "REVIEW_POSTED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = {
  reviewSignup,
};
