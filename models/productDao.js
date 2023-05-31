const { appDataSource } = require("./dataSource");

const getdetailProduct = async (productId) => {
  try {
    return await appDataSource.query(
      `
	SELECT p.name, 
         p.price, 
         p.description
	FROM products as p
	WHERE p.id = ?
	`,
      [productId]
    );
  } catch (err) {
    const error = new Error("INVALID_DETAILDATA");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getdetailProduct,
};
