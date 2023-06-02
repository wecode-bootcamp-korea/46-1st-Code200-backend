const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "UNAUTHORIZE" });
    }
    const userdata = jwt.verify(token, process.env.JWT_SECRET);

    const verifyId = userdata.userId;
    if (!verifyId) {
      res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(401).json({ message: "Erro GETDATABASE" });
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  verifyJWT,
};
