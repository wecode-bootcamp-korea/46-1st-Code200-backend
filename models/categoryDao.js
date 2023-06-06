const { appDataSource } = require("./dataSource");

const getCategoryDetail = async () => {
  try {
    const query = `
      SELECT
        c.id AS categoryId, 
        c.name AS categoryName,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'subcategoryId', sc.id,
            'subcategoryName', sc.name,
            'categoryId', c.id
          )
        ) AS subcategories
      FROM categories AS c
      INNER JOIN subcategories AS sc ON sc.category_id = c.id
      GROUP BY c.id, c.name;
    `;
    return appDataSource.query(query);
  } catch (error) {
    console.log("Error parsing subcategories JSON:", JSON.stringify(error));
    throw error;
  }
};

module.exports = {
  getCategoryDetail,
};
