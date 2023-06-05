const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/auth");
const { catchAsync } = require("../middleware/error");
const likeController = require("../controllers/likeController");

router.post("/:productId", verifyJWT, catchAsync(likeController.createLike));
router.delete(
  "/delete/:productId",
  verifyJWT,
  catchAsync(likeController.deleteLike)
);
router.get("/:productId", catchAsync(likeController.getCountLike));

module.exports = {
  router,
};
