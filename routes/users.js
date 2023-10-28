const express = require('express');
const {
  feedDB,
  getRecentMessages,
  getUnreadMessages,
  searchUsers,
} = require('../controllers/userController');

const router = express.Router();

router.post('/feedDB', feedDB);
router.get('/unreadMessages/:id', getUnreadMessages);
router.get('/search', searchUsers);
router.get('/usersByRecentMessage/:id', getRecentMessages);

module.exports = router;
