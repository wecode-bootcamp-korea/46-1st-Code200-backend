const likeService = require("../services/likeService");
const { catchAsync } = require("../middleware/error");

const createLike = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    await likeService.createLike(userId, productId);
    return res.status(201).json({ message: "LIKE CREATED" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
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
