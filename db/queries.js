const pool = require("./pool");

async function getFurniture(id) {
  let query = `
    SELECT *
    FROM furniture
    WHERE id=${id}
    `;

  const { rows } = await pool.query(query);
  return rows;
}

async function getFurnitures(filters) {
  let query = `
    SELECT furniture.id, name, categories.category as category, quantity
    FROM furniture
    JOIN categories ON furniture.category=categories.id
    `;

  const filtersLen = Object.keys(filters).length;
  if (filtersLen) {
    query += "WHERE";

    Object.keys(filters).forEach((key, index) => {
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

async function updateFurniture(props) {
  let params = "";
  Object.keys(props).forEach((k, i) => {
    if (k === "id") return;
    if (k === "name") {
      params += `${k} = \'${props[k]}\'`;
    } else {
      params += `${k} = ${props[k]}`;
    }

    if (i != Object.keys(props).length - 1) params += ", ";
  });

  let query = `
    UPDATE furniture
    SET ${params}
    WHERE id = ${props.id}
    `;

  await pool.query(query);
}

async function addFurniture(props) {
  let query = `
    INSERT INTO furniture(name, category, quantity)
    VALUES (\'${props.name}\', ${props.category}, ${props.quantity})
    `;

  await pool.query(query);
}

async function deleteFurniture(id) {
  let query = `
    DELETE FROM furniture
    WHERE id = ${id}
    `;

  await pool.query(query);
}

module.exports = {
  getFurniture,
  getFurnitures,
  getAllCategories,
  updateFurniture,
  addFurniture,
  deleteFurniture,
};
