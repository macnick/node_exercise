const { Op } = require('sequelize');
const { Message } = require('../models/userModel');

const allMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json({
      messages,
      message: 'Messages were retrieved successfully!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const newMessage = async (req, res) => {
  const { from, to, message } = req.body;
  const newMessage = {
    senderId: from,
    receiverId: to,
    message,
  };

  try {
    await Message.create(newMessage);
    res.status(201).json({
      message: 'Message was sent successfully!',
      newMessage,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const currentMessage = await Message.findByPk(id);
    if (!currentMessage) {
      return res.status(404).json({
        status: 'fail',
        message: 'Message with the specified ID was not found!',
      });
    }

    await currentMessage.update({ message });
    console.log({ message });
    res.status(200).json({
      message: 'Message was updated successfully!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const messagesBetweenUsers = async (req, res) => {
  try {
    const user1 = req.params.user1;
    const user2 = req.params.user2;

    const messagesBetweenUsers = await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderId: user1,
            receiverId: user2,
          },
          {
            senderId: user2,
            receiverId: user1,
          },
        ],
      },
      order: [['updatedAt', 'DESC']],
    });

    const responseMessage = messagesBetweenUsers.length
      ? 'Messages between users were retrieved successfully!'
      : 'No messages were found between users!';

    res.status(200).json({
      messagesBetweenUsers,
      message: responseMessage,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const searchMessages = async (req, res) => {
  console.log(req.body);
  try {
    const whereClause = req.body;

    if (whereClause.message) {
      whereClause.message = {
        [Op.like]: `%${whereClause.message}%`,
      };
    }

    const messages = await Message.findAll({
      where: whereClause,
    });

    res.status(200).json({
      data: { messages },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  allMessages,
  newMessage,
  updateMessage,
  messagesBetweenUsers,
  searchMessages,
};
