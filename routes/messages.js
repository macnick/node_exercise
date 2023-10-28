const express = require('express');
const {
  newMessage,
  updateMessage,
  messagesBetweenUsers,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', (req, res, next) => res.send('Hello from messages route!'));
router.post('/', newMessage);
router.patch('/:id', updateMessage);
router.get('/:user1/:user2', messagesBetweenUsers);

module.exports = router;
