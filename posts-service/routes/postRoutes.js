const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updateLikesCount
} = require('../controllers/postController');

// Création d’un post (POST /api/posts)
router.post('/', createPost);

// Récupération de tous les posts (GET /api/posts)
router.get('/', getPosts);

// Récupération d’un post spécifique par son ID (GET /api/posts/:id)
router.get('/:id', getPostById);

// Mise à jour du nombre de likes (PUT /api/posts/:id)
router.put('/:id', updateLikesCount);

module.exports = router;
