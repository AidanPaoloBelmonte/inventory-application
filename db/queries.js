const pool = require("./pool");

async function getFurniture(filters) {
  let query = `
    SELECT name, categories.category as category, quantity
    FROM furniture
    JOIN categories ON furniture.category=categories.id
    `;

  const filtersLen = Object.keys(filters).length;
  if (filtersLen) {
    query += "WHERE";

    Object.keys(filters).forEach((key, index) => {
      console.log(key, typeof filters[key], filters[key]);
      switch (typeof filters[key]) {
        case "string":
          query += ` furniture.${key} LIKE \'%${filters[key]}%\'`;
          break;
        case "number":
          query += ` furniture.${key} = ${filters[key]}`;
          break;
        case "object":
          if (Array.isArray(filters[key])) {
            query += ` furniture.${key} IN (${filters[key]})`;
          }
          break;
      }

      if (index < filtersLen - 1) query += " AND";
    });
  }

  console.log(query);

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
