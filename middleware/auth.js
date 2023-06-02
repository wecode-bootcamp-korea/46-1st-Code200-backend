const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!req.headers.authorization) {
      res.status(401).json({ message: "UNAUTHORIZE" });
    }

    const userdata = jwt.verify(token, process.env.JWT_SECRET);
    const verifyId = userdata.userId;

    if (!verifyId) {
      return res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }

    const userDataFromDb = await userDao.getByUserIdPassword(userId);

    if (!userDataFromDb.userId) {
      return res.status(401).json({ message: "Erro GETDATABASE" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};
module.exports = {
  verifyJWT,
};
