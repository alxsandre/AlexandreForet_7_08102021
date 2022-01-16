const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const auth = require('../middleware/auth');
const authToUpDate = require('../middleware/authToUpDate');
const authToDelete = require('../middleware/authToDelete');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/profile/:id', auth, authToUpDate, userController.modifyLogin);
router.delete('/:id', auth, authToDelete, userController.deleteUser);

module.exports = router;