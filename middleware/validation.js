const emailValidationCheck = async (email) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  if (!emailRegex.test(email)) {
    const error = new Error("EMAIL_IS_NOT_VALID");
    error.statusCode = 409;
    throw error;
  }
};
const passwordValidationCheck = async (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!passwordRegex.test(password)) {
    const error = new Error("PASSWORD_IS_NOT_VALID");
    error.statusCode = 409;
    throw error;
  }
};

module.exports = {
  passwordValidationCheck,
  emailValidationCheck,
};
