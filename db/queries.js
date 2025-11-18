const pool = require("./pool");

async function getFurniture(filters) {
  let query = `
    SELECT name, categories.category as category, quantity
    FROM furniture
    JOIN categories ON furniture.category=categories.id
    `;

  const { rows } = await pool.query(query);
  return rows;
}

async function getAllCategories() {
  let query = `
    SELECT * FROM categories
    `;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getFurniture,
  getAllCategories,
};
