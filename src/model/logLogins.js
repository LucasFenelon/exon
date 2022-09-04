const Sequelize = require('sequelize');
const database = require('../config/db');
const RegisterUsers = require('./registerUsers');
// import { Sequelize } from 'sequelize';
// import database from 'src/config/db';
// import RegisterUsers from 'src/model/registerUsers';

const LogLogins = database.define(
  'Logins',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: RegisterUsers,
        key: 'id',
      },
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    typeLogin: {
      type: Sequelize.ENUM('success', 'error'),
      defaultValue: 'success',
    },
  },
  {
    schema: 'log',
    tableName: 'Logins',
  },
);

RegisterUsers.hasMany(LogLogins, { foreignKey: 'userId' });
LogLogins.belongsTo(RegisterUsers, { foreignKey: 'userId' });

module.exports = LogLogins;
