const userService = require("../services/userService");
const { catchAsync } = require("../middleware/error");

const signUp = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            phone,
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
        if (!name || !email || !password) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await userService.signUp(
            name,
            username,
            email,
            phone,
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

    const isDuplicate = await userService.checkDuplicateId(email);

    if (isDuplicate) {
        return res.status(200).json({ duplicate: false });
    }

    return res.status(200).json({ duplicate: true });
});

module.exports = {
    signUp,
    signIn,
    checkId,
};
