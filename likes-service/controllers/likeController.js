const Like = require('../models/Like');
const axios = require('axios');

// Ajout d'un fallback vers http://localhost:3002 si POSTS_SERVICE n'est pas défini dans le .env
const POSTS_SERVICE_URL = process.env.POSTS_SERVICE || 'http://localhost:3002';

exports.addLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const like = await Like.create({ postId, userId });

    // Mise à jour du compteur de likes dans le posts-service
    await axios.put(`${POSTS_SERVICE_URL}/api/posts/${postId}`, {
      $inc: { likesCount: 1 }
    });

    res.status(201).json(like);
  } catch (err) {
    console.error('Error in addLike:', err.message);
    res.status(500).json({ error: 'Error adding like or already liked' });
  }
};

exports.removeLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const like = await Like.findOneAndDelete({ postId, userId });

    if (like) {
      await axios.put(`${POSTS_SERVICE_URL}/api/posts/${postId}`, {
        $inc: { likesCount: -1 }
      });
    }

    res.json({ message: 'Like removed' });
  } catch (err) {
    console.error('Error in removeLike:', err.message);
    res.status(500).json({ error: 'Error removing like' });
  }
};

exports.getLikesForPost = async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId });
    res.json(likes);
  } catch (err) {
    console.error('Error in getLikesForPost:', err.message);
    res.status(500).json({ error: 'Error fetching likes' });
  }
};
