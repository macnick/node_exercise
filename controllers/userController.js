const User = require('../models/userModel');
const Message = require('../models/messageModel');
const { xlsx } = require('xlsx');

const feedDB = async (req, res, next) => {
  try {
    const workbook = xlsx.readFile('../seeds.xlsx');
    const users = workbook.Sheets['users'];
    const messages = workbook.Sheets['messages'];

    console.log(users);
    res.status(200).json({
      message: 'Database was fed successfully!',
    });
  } catch (err) {
    console.log(err);
  }
};

const getUnreadMessages = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    message: 'GET request to /unreadMessages',
  });
};

const getRecentMessages = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    message: 'GET request to /usersByRecentMessage',
  });
};

const searchUsers = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    message: 'GET request to /search',
  });
};

module.exports = {
  feedDB,
  getRecentMessages,
  getUnreadMessages,
  searchUsers,
};
