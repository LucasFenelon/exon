const Sequelize = require('sequelize');
const database = require('../config/db');
const RegisterUserTypes = require('./registerUserTypes');
// import { Sequelize } from 'sequelize';
// import database from 'src/config/db';
// import RegisterUserTypes from 'src/model/registerUserTypes';

const RegisterUsers = database.define(
  'Users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: RegisterUserTypes,
        key: 'id',
      },
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    dtNasc: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
    },
    address: {
      type: Sequelize.DataTypes.STRING(3000),
    },
    active: {
      type: Sequelize.ENUM('yes', 'no'),
      defaultValue: 'yes',
      allowNull: false,
    },
  },
  {
    schema: 'register',
    tableName: 'Users',
  },
);

RegisterUserTypes.hasMany(RegisterUsers, { foreignKey: 'userTypeId' });
RegisterUsers.belongsTo(RegisterUserTypes, { foreignKey: 'userTypeId' });

module.exports = RegisterUsers;
