const { appDataSource } = require("./dataSource");

const createUser = async (
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
  try {
    return await appDataSource.query(
      `INSERT INTO users(
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
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
		`,
      [
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
      ]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};
const getUserByemail = async (userId) => {
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

module.exports = {
  createUser,
  getUserByemail,
};
