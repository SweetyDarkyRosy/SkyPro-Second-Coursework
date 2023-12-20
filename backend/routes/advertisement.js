const router = require('express').Router()
const { publishAd, updateAd, getAds, getAd, deleteAd, publishComment } = require('../controllers/advertisement');


router.get('/ads', getAds);
router.get('/ads/:id', getAd);
router.post('/ads', publishAd);
router.patch('/ads/:id', updateAd);
router.delete('/ads/:id', deleteAd);
router.post('/ads/:id/comments', publishComment);


module.exports = router;
