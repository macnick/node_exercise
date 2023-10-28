const http = require('http');
const app = require('./App');
const sequelize = require('./db');

async function connectToDb() {
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
