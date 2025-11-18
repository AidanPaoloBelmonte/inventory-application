const { Pool } = require("pg");

require("dotenv").config();

module.exports = new Pool({
  host: process.env.SQL_ADDRESS,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
