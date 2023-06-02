const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");
router.post("/:userId/:productId", likeController.createLike);
router.delete("/delete/:userId/:productId", likeController.deleteLike);

module.exports = {
  router,
};
