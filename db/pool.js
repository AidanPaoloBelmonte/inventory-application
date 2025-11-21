const { Pool } = require("pg");

require("dotenv").config();

const connectionProps = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`;

module.exports = new Pool(connectionProps);
