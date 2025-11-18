const pool = require("./pool");

async function getAllFurniture(filters) {
  let query = `
    SELECT name, categories.category as category, quantity
    FROM furniture
    JOIN categories ON furniture.category=categories.id
    `;

  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  getAllFurniture,
};
