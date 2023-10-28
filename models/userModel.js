const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Message = require('./messageModel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: DataTypes.DATE,
  gender: {
    type: DataTypes.STRING,
  },
  password: DataTypes.STRING,
  username: DataTypes.STRING,
});

User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

module.exports = User;
