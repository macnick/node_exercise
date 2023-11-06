const { User, Message } = require('../models/userModel');
const readXlsxfile = require('read-excel-file/node');
const sequelize = require('../db');
const Sequelize = require('sequelize');

const feedDB = async (req, res, next) => {
  const usersArray = await readXlsxfile('./seeds.xlsx', { sheet: 'users' });
  const messagesArray = await readXlsxfile('./seeds.xlsx', {
    sheet: 'messages',
  });

  const users = usersArray.map((item) => ({
    // id: item[0],
    firstName: item[1],
    lastName: item[2],
    dateOfBirth: item[3],
    gender: item[4],
    username: item[5],
  }));

  const messages = messagesArray.map((item) => ({
    // id: item[0],
    message: item[1],
    senderId: item[2],
    receiverId: item[3],
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

const getUnreadMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const unreadMessages = await Message.findAll({
      where: { receiverId: id, isRead: false },
    });

    res.status(200).json({
      data: unreadMessages,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getRecentMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const messages = await Message.findAll({
      attributes: [
        'senderId',
        [Sequelize.fn('MAX', Sequelize.col('updatedAt')), 'updatedAt'],
        'message',
      ],
      where: {
        receiverId: userId,
      },
      group: ['senderId', 'message'],
      order: [[Sequelize.fn('MAX', Sequelize.col('updatedAt')), 'DESC']],
    });

    messages.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const uniqueMessages = messages.reduce((acc, message) => {
      const exists = acc.find((m) => m.senderId === message.senderId);
      if (!exists) {
        acc.push(message);
      }
      return acc;
    }, []);

    const userIds = uniqueMessages.map((message) => message.senderId);

    const users = await User.findAll({
      where: {
        id: userIds,
      },
    });

    console.log({ userIds });

    const sortedUsers = users.sort((a, b) => {
      const indexA = userIds.indexOf(a.id);
      const indexB = userIds.indexOf(b.id);
      return indexA - indexB;
    });

    res.status(200).json({
      data: sortedUsers,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: req.body,
    });
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  feedDB,
  getRecentMessages,
  getUnreadMessages,
  searchUsers,
};
