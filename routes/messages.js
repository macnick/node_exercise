const express = require('express');
const {
  allMessages,
  newMessage,
  updateMessage,
  messagesBetweenUsers,
  searchMessages,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/find', searchMessages);
router.patch('/:id', updateMessage);
router.get('/:user1/:user2', messagesBetweenUsers);
router.route('/').get(allMessages).post(newMessage);

module.exports = router;
