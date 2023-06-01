const { appDataSource } = require("./dataSource");

const createUser = async (
    name,
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
) => {
    try {
        return await appDataSource.query(
            `INSERT INTO users(
                name,
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
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
		`,
            [
                name,
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
            ]
        );
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};
const getByUserIdPassword = async (userId) => {
    try {
        const getUser = await appDataSource.query(
            `
      SELECT
      users.email as userId,
      users.password as password
      FROM users
      WHERE users.email=?
      `,
            [userId]
        );
        return getUser[0];
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

const getByUserEmail = async (email) => {
    console.log(" ----------------------------------------------------");
    console.log("file: userDao.js:76 | getByUserEmail | email:", email);
    console.log(" ----------------------------------------------------");
    try {
        const getUser = await appDataSource.query(
            `
        SELECT users.email
        FROM users
        WHERE email = ?
        `,
            [email]
        );
        return getUser[0];
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUser,
    getByUserIdPassword,
    getByUserEmail,
};
