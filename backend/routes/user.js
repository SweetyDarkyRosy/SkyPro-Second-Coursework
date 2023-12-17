const router = require('express').Router()
const { addUser, logIn, updateUserInfo } = require('../controllers/user');


router.post('/users/login', logIn);
router.post('/users/signup', addUser);
router.patch('/users/:id', updateUserInfo);


module.exports = router;
