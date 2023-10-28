const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'postgres://pccw_user:pccw_password@postgres_db:5432/pccw_db'
);

module.exports = sequelize;
