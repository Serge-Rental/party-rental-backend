const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DB}`,
  { logging: false }
);
// process.env.PG_DB,
// process.env.PG_USER,
// process.env.PG_PASSWORD,
// {
//     host: process.env.PG_HOST,
//     dialect: 'postgres',
// }

module.exports = sequelize;
