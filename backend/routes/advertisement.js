const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { publishAd, updateAd, getAds, getAd, deleteAd, publishComment } = require('../controllers/advertisement');


router.get('/ads', getAds);
router.get('/ads/:id', getAd);
router.post('/ads', upload.array('images', 5), publishAd);
router.patch('/ads/:id', upload.array('images', 5), updateAd);
router.delete('/ads/:id', deleteAd);
router.post('/ads/:id/comments', publishComment);


module.exports = router;
