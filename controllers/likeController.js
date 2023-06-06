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

  const [result, isLiked] = await likeService.createLike(userId, productId);
  if (result) {
    return res.status(201).json({ countLike: result, isLiked });
  }
});

const deleteLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  if (!productId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  await likeService.deleteLike(userId, productId);
  const likeCount = await likeService.countLikes(productId);

  return res.status(200).json({ likeCount });
});

module.exports = {
  createLike,
  deleteLike,
};
