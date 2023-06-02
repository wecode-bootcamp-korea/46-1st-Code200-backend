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
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const getUser = await appDataSource.query(
      `
      SELECT
        id,
        users.email,
        users.password
      FROM users
      WHERE users.email=?
      `,
      [email]
    );
    return getUser[0];
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const getUser = await appDataSource.query(
      `
      SELECT
      id,
      users.email,
      users.password
      FROM users
      WHERE users.id=?
      `,
      [userId]
    );
    return getUser[0];
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getByUserEmail = async (email) => {
  try {
    console.log(email);
    const [user] = await appDataSource.query(
      `
        SELECT users.email
        FROM users
        WHERE email = ?
      `,
      [email]
    );

    return user;
  } catch (err) {
    const error = new Error(
      "An error occurred while checking the email availability."
    );
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getByUserEmail,
  getUserByEmail,
};
