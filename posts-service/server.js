const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Posts Service connected to MongoDB');
    app.listen(process.env.PORT || 3002, () => console.log(`✅ Posts Service running on port ${process.env.PORT || 3002}`));
  })
  .catch(err => console.error(err));
