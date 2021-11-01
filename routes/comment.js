const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postController = require('../controllers/comment');

router.post('/', auth, postController.createComment);
router.put('/:id', auth, postController.modifyComment);
router.get('/:id', auth, postController.getAllComments);
router.delete('/:id', auth, postController.deleteComment);
/*
router.get('/:id', auth, postController.getOnePost);
router.get('/', auth, postController.getAllPosts);
router.delete('/:id', auth, postController.deletePost);
*/
module.exports = router;