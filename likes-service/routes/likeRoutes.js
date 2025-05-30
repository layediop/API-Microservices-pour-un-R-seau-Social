const express = require('express');
const router = express.Router();
const {
  addLike,
  removeLike,
  getLikesForPost
} = require('../controllers/likeController');

router.post('/', addLike);
router.delete('/', removeLike);
router.get('/:postId', getLikesForPost);

module.exports = router;
