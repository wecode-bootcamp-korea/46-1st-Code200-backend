const userService = require("../services/userService");
const { catchAsync } = require("../middleware/error");

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

const checkId = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "INVALID_INPUT" });
  }

  try {
    const existingUser = await userService.checkDuplicateId(email);

    if (existingUser) {
      return res
        .status(200)
        .json({ duplicate: false, message: "The email is unavailable." });
    } else {
      return res.status(200).json({
        duplicate: true,
        message: "The email is available for use.",
      });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = {
  signUp,
  signIn,
  checkId,
};
