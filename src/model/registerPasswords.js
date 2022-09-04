const Sequelize = require('sequelize');
const { bcrypt }  = require('bcrypt');
const database = require('../config/db');
const RegisterUsers = require('./registerUsers');
// import { Sequelize } from 'sequelize';
// import { bcrypt } from 'bcrypt';
// import database from 'src/config/db';
// import RegisterUsers from 'src/model/registerUsers';

const RegisterPasswords = database.define(
  'Passwords',
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
    password: {
      type: Sequelize.DataTypes.STRING(3000),
      allowNull: false,
    },
    dtExpitation: {
      type: Sequelize.DataTypes.DATE,
    },
    active: {
      type: Sequelize.ENUM('yes', 'no'),
      defaultValue: 'yes',
      allowNull: false,
    },
  },
  {
    schema: 'register',
    tableName: 'Passwords',
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  },
);

RegisterUsers.hasMany(RegisterPasswords, { foreignKey: 'userId' });
RegisterPasswords.belongsTo(RegisterUsers, { foreignKey: 'userId' });

module.exports = RegisterPasswords;
