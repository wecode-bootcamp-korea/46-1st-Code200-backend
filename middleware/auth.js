const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const verifyJWT = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: "UNAUTHORIZE" });
    }
    const token = req.headers.authorization;
    const userdata = jwt.verify(token, process.env.JWT_SECRET);
    const verifyId = userdata.userId;
    if (!verifyId) {
      res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }
    const userDataFromDb = await userDao.getByUserIdPassword(userId);
    if (!userDataFromDb.userId) {
      res.status(401).json({ message: "Erro GETDATABASE" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  verifyJWT,
};
