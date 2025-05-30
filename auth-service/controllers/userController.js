// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   try {
//     const { userName, email, password } = req.body;
//     const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
//     if (existingUser) return res.status(400).json({ error: 'User already exists' });

//     const user = await User.create({ userName, email, password });
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { userName, password } = req.body;
//     const user = await User.findOne({ userName });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const resetToken = Math.random().toString(36).substring(2, 12);
//     user.resetToken = resetToken;
//     await user.save();

//     res.json({ message: 'Reset token generated', resetToken }); // ⚠️ À remplacer par email dans prod
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Enregistrement de l'utilisateur
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Connexion de l'utilisateur
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Récupération de mot de passe (via resetToken en mock)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = Math.random().toString(36).substring(2, 12);
    user.resetToken = resetToken;
    await user.save();

    // 🚨 En production, ce token doit être envoyé par email
    res.json({
      message: 'Reset token generated. (In prod, send via email)',
      resetToken,
    });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
