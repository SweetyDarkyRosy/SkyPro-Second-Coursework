const router = require('express').Router()
const { getComment, updateComment, deleteComment } = require('../controllers/comment');


router.get('/comments/:id', getComment);
router.patch('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);


module.exports = router;
