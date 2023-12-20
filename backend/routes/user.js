const router = require('express').Router()
const { addUser, logIn, getUserInfo, updateUserInfo, getAdsOfUser } = require('../controllers/user');


router.post('/users/login', logIn);
router.post('/users/signup', addUser);
router.get('/users/:id', getUserInfo);
router.patch('/users/:id', updateUserInfo);
router.get('/users/:id/ads', getAdsOfUser);


module.exports = router;
