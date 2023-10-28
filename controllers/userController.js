const User = require('../models/userModel');
const Message = require('../models/messageModel');
const readXlsxfile = require('read-excel-file/node');

const feedDB = async (req, res, next) => {
  const usersArray = await readXlsxfile('./seeds.xlsx', { sheet: 'users' });
  const messagesArray = await readXlsxfile('./seeds.xlsx', {
    sheet: 'messages',
  });

  const users = usersArray.map((item) => ({
    id: item[0],
    firstName: item[1],
    lastName: item[2],
    dateOfBirth: item[3],
    gender: item[4],
    username: item[5],
  }));

  const messages = messagesArray.map((item) => ({
    id: item[0],
    senderId: item[1],
    receiverId: item[2],
    message: item[3],
    isRead: item[4],
  }));

  try {
    await User.sync({ force: true });
    await Message.sync({ force: true });
    await User.bulkCreate(users);
    await Message.bulkCreate(messages);
    res.status(200).json({
      message: 'Database was fed successfully!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }

  next();
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
