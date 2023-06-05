const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const userDao = require("../models/userDao");
=======
const userService = require("../services/userService");
>>>>>>> main

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "UNAUTHORIZE" });
    }
<<<<<<< HEAD
    const userdata = jwt.verify(token, process.env.JWT_SECRET);

    const verifyId = userdata.userId;
    if (!verifyId) {
      res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(401).json({ message: "Erro GETDATABASE" });
=======

    const userdata = jwt.verify(token, process.env.JWT_SECRET);
    const verifyId = userdata.userId;

    if (!verifyId) {
      return res.status(401).json({ message: "Erro UNAUTHORIZE" });
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(401).json({ message: "Erro GETDATABASE" });
>>>>>>> main
    }
    req.user = user;

    next();
  } catch (err) {
<<<<<<< HEAD
    res.status(500).json({ message: err });
  }
};

=======
    return res.status(401).json({ message: err });
  }
};
>>>>>>> main
module.exports = {
  verifyJWT,
};
