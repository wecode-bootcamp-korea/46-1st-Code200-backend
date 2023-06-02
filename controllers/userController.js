const userService = require("../services/userService");
const { catchAsync } = require("../middleware/error");
const {
  emailValidationCheck,
  passwordValidationCheck,
} = require("../utils/validation");

const checkEmail = catchasync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error(" EMPTY email ! ");
    error.statuscode = 400;
    throw error;
  }

  await emailValidationCheck(email);

  const result = await userService.checkEmail(email);

  if (!result) return res.status(200).json({ theEmailExist: false });

  return res.status(200).json({ theEmailExist: true });
});

const signUp = async (req, res) => {
  try {
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
      !phone_number ||
      !birthday ||
      !gender ||
      !address ||
      !address_detail ||
      !password ||
      !point ||
      !agreement_private ||
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
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

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
  checkEmail,
};
