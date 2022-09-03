import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: { useUTC: false },
  },
);

sequelize.dialect.supports.schemas = true;
module.exports = sequelize;
