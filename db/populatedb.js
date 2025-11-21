const { Client } = require("pg");

require("dotenv").config();

const CreateCategory = `
  DROP TABLE IF EXISTS categories;

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(255)
  );

  INSERT INTO categories(category)
  VALUES
    ('Chair'),
    ('Table'),
    ('Desk'),
    ('Lamp'),
    ('Vase');
  `;

const CreateItems = `
  DROP TABLE IF EXISTS furniture;

  CREATE TABLE IF NOT EXISTS furniture (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    category_id INTEGER REFERENCES categories(id),
    quantity INTEGER
  );

  INSERT INTO furniture (name, category, quantity)
  VALUES
    ('Himwo Factory Talkyl Chair', '1', '104'),
    ('Desen and Warm Sefront Table Lamp', '4', '78'),
    ('Golden Suwa', '1', '213'),
    ('Clay Pen Glossia Contracting Dining Table', '2', '48'),
    ('Warren Furniture Shopendon Home Office Desk', '3', '523'),
    ('Marble Marble', '5', '18'),
    ('Katy Apsio', '5', '22'),
    ('German Gray Urn', '5', '48'),
    ('YahooGum Computer Desk', '3', '53'),
    ('FlexiMax by Gnoll', '1', '58'),
    ('Looky Ferb Cordless Table Lamp with Shade', '4', '201'),
    ('Ainus Peter Ren Dining Table', '2', '210'),
    ('Peter Louison Pink Portable Lamp', '4', '76'),
    ('FlexiQuad Connor Electric Standing Desk', '3', '85'),
    ('Antarctic Penguins Dining Table', '2', '10');
  `;

async function main() {
  console.log("Seeding database warehouse...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(CreateCategory);
  await client.query(CreateItems);
  await client.end();

  console.log("Done.");
}

main();
