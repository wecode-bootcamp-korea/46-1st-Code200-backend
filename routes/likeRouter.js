const express = require("express");

const { verifyJWT } = require("../middleware/auth");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/:productId", verifyJWT, likeController.createLike);
router.delete("/:productId", verifyJWT, likeController.deleteLike);

module.exports = {
  router,
};
