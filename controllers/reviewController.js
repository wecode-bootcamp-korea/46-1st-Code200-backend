const reviewService = require("../services/reviewService");

const reviewSignup = async (req, res) => {
  try {
    const { userId, productId, content, rating } = req.body;
    await reviewService.reviewSignUp(userId, productId, content, rating);
    return res.status(201).json({ message: "REVIEW_POSTED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  reviewSignup,
};
