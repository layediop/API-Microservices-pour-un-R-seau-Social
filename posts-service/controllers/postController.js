const Post = require('../models/Post');

// ✅ Créer un post
exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ error: 'Title, content and userId are required' });
    }

    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating post' });
  }
};

// ✅ Récupérer tous les posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // tri du plus récent au plus ancien
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// ✅ Récupérer un post par ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// ✅ Mise à jour des likes uniquement
exports.updateLikesCount = async (req, res) => {
  try {
    const { $inc } = req.body;

    if (!$inc || typeof $inc.likesCount !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing $inc.likesCount' });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likesCount: $inc.likesCount } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating likes count' });
  }
};
