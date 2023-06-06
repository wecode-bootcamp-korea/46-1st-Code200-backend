const likeService = require("../services/likeService");
const { catchAsync } = require("../middleware/error");

const createLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  if (!productId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  const result = await likeService.createLike(userId, productId);

  if (result) {
    return res.status(201).json({ message: result });
  }

  return res.status(400).json({ message: result });
});

const deleteLike = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    await likeService.deleteLike(userId, productId);
    return res.status(200).json({ message: "LIKE DELETED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = {
  createLike,
  deleteLike,
};
