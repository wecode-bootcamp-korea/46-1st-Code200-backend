const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "UNAUTHORIZE" });
    }

    const userdata = jwt.verify(token, process.env.JWT_SECRET);
    const verifyId = userdata.userId;

    if (!verifyId) {
      return res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(401).json({ message: "Erro GETDATABASE" });
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
