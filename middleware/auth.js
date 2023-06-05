const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const userdata = jwt.verify(token, process.env.JWT_SECRET);
    const verifyId = userdata.userId;
    if (!verifyId) {
      return res.status(401).json({ message: "Error UNAUTHORIZED" });
    }

    const user = await userService.getUserById(verifyId);
    if (!user) {
      return res.status(401).json({ message: "Error GETDATABASE" });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports = {
  verifyJWT,
};
