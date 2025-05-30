const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const likeRoutes = require('./routes/likeRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/likes', likeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Like Service connected to MongoDB');
    app.listen(process.env.PORT || 3003, () =>
      console.log(`✅ Like Service running on port ${process.env.PORT || 3003}`)
    );
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
