const express = require('express');
const router = express.Router();

//const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postController = require('../controllers/post');

router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.modifyPost);
router.get('/:id', auth, postController.getOnePost);
router.get('/', auth, postController.getAllPosts);


/*
router.post('/:id/like', auth, postController.modifyLike);
router.delete('/:id', auth, postController.deleteSauce);
*/
module.exports = router;