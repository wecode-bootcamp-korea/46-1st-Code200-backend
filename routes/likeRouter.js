const { verifyJWT } = require("../middleware/auth");
const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/:productId", verifyJWT, likeController.createLike);
router.delete("/delete/:productId", verifyJWT, likeController.deleteLike);

module.exports = {
  router,
};
