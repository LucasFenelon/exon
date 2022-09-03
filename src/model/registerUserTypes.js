import { Sequelize } from 'sequelize';
import database from 'src/config/db';

const RegisterUserTypes = database.define(
  'UserTypes',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    schema: 'register',
    tableName: 'UserTypes',
  },
);

module.exports = RegisterUserTypes;
