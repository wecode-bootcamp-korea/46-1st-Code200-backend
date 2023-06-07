const likeService = require("../services/likeService");
const { catchAsync } = require("../middleware/error");

const createLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const result = await likeService.createLike(userId, productId);

  return res.status(201).json({ message: "CREATE_LIKE_SUCCESS" });
});

const deleteLike = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  await likeService.deleteLike(userId, productId);

  return res.status(200).json({ message: "DELETE_LIKE_SUCCESS" });
});

module.exports = {
  createLike,
  deleteLike,
};
