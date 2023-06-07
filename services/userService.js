const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkEmail = async (email) => {
  return userDao.checkRegisterdEmail(email);
};

const signIn = async (email, password) => {
  const getUser = await userDao.getUserByEmail(email);
  if (!getUser) {
    throw new Error("INVAILD ERROR");
  }
  const isMatched = await bcrypt.compare(password, getUser.password);
  if (!isMatched) {
    const error = new Error("INVALID_USER");
    error.statusCode = 401;
    throw error;
  }
  const payload = {
    userId: getUser.id,
  };
  const header = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, header);
  return accessToken;
};

const signUp = async (
  name,
  email,
  phone_number,
  birthday,
  gender,
  address,
  address_detail,
  password,
  point,
  agreement_private,
  agreement_marketing,
  agreement_terms
) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    email,
    phone_number,
    birthday,
    gender,
    address,
    address_detail,
    hashedPassword,
    point,
    agreement_private,
    agreement_marketing,
    agreement_terms
  );
  return createUser;
};

const getUserById = async (userId) => {
  return userDao.getUserById(userId);
};

const getUserInfo = async (userId) => {
  return userDao.getUserInfo(userId);
};

const updateUser = async (
  userId,
  password,
  address,
  addressDetail,
  phoneNumber
) => {
  return userDao.updateUser(
    userId,
    password,
    address,
    addressDetail,
    phoneNumber
  );
};

module.exports = {
  signUp,
  signIn,
  checkEmail,
  getUserById,
  getUserInfo,
  updateUser,
};
