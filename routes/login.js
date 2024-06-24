var express = require('express');
const Users = require('../models/userModels');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login');
});


router.post('/', async (req, res) => {
  const { username, password } = req.body;


  try {
    // Cari pengguna berdasarkan username
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).render('login', { error: 'User not found' });
    }

    // Bandingkan password yang di-hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render('login', { error: 'Invalid password' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, 'rahasia', { expiresIn: '1h' });
    console.log(token)

    // Simpan token di cookie atau localStorage sesuai kebutuhan aplikasi
    res.cookie('token', token, { httpOnly: true });

    // Redirect atau render halaman setelah login berhasil
    res.redirect('/home'); // Ganti '/dashboard' dengan halaman setelah login berhasil
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('error', { error: 'Internal server error' });
  }
});


module.exports = router;
