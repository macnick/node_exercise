const { Sequelize } = require('sequelize');
const http = require('http');
const app = require('./App');

async function connectToDb() {
  const sequelize = new Sequelize(
    'postgres://pccw_user:pccw_password@postgres_db:5432/pccw_db'
  );
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

console.log(
  'process.env is',
  `${process.env.POSTGRES_USER}`,
  `${process.env.POSTGRES_DB}`
);

const postgresClient = connectToDb();

const port = 3000;
const server = http.createServer(app);
server.listen(port);
