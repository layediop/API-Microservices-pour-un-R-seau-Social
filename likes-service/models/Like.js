const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Empêche un utilisateur de liker deux fois le même post
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
