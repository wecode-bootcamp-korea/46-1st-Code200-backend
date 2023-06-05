const userService = require("../services/userService");
const { catchAsync } = require("../middleware/error");

const signUp = catchAsync(async (req, res) => {
  const {
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
    agreement_terms,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone_number ||
    !birthday ||
    !gender ||
    !address ||
    !address_detail ||
    !password ||
    !point ||
    !agreement_private ||
    !agreement_marketing ||
    !agreement_terms
  ) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  await userService.signUp(
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
  );
  return res.status(201).json({ message: "SIGNUP_SUCESS" });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "INVAILED_INPUT_ERROR" });
  }

  const accessToken = await userService.signIn(email, password);
  return res.status(200).json({ message: "USER_CORRECT", accessToken });
});

module.exports = {
  signUp,
  signIn,
};
