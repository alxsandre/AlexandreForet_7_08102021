const express = require('express');
const router = express.Router();

//const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const statusIsAdminer = require('../middleware/statusIsAdminer');
const postController = require('../controllers/post');

router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.modifyPost);
router.get('/:id', auth, postController.getOnePost);
router.get('/', auth, postController.getAllPosts);
router.delete('/:id', auth, statusIsAdminer, postController.deletePost);

/*
router.post('/:id/like', auth, postController.modifyLike);
*/
module.exports = router;