const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const likeController = require('../controllers/like');

router.post('/:userId/:postId', auth, likeController.modifyLike);

module.exports = router;