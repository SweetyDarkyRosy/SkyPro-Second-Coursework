const router = require('express').Router();

const { getImage } = require('../controllers/image');


router.get('/images/:name', getImage);


module.exports = router;
