const Sequelize = require('sequelize');
// import { Sequelize } from 'sequelize';

console.log("===")
console.log(process.env.DB_SCHEMA)
console.log("===")

const sequelize = new Sequelize(
  'sys',
  'app_user',
  '3x0Ng3N0m1C5',
  {
    host: 'platform-database-dev.cekk6b0a4bm9.us-east-1.rds.amazonaws.com',
    port: '3306',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: { useUTC: false },
  },
);

sequelize.dialect.supports.schemas = true;
module.exports = sequelize;
