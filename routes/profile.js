// routes/profile.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware authenticateToken
// (Dapat disimpan dalam file terpisah jika digunakan di berbagai rute)
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).render('login', { error: 'Unauthorized: Please login first' });
    }

    jwt.verify(token, 'rahasia', (err, user) => {
        if (err) {
            return res.status(403).render('login', { error: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Route untuk menampilkan halaman profil pengguna
router.get('/', authenticateToken, async (req, res) => {
    try {
        // Cari pengguna berdasarkan ID yang ada dalam token JWT
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).render('error', { error: 'User not found' });
        }
        res.render('profile', { user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).render('error', { error: 'Internal server error' });
    }
});

// Route untuk memperbarui data profil pengguna
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { id, username, email } = req.user;
        const { newUsername, newEmail, newPassword } = req.body;

        // Cari pengguna berdasarkan ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).render('error', { error: 'User not found' });
        }

        // Update username jika ada perubahan
        if (newUsername && newUsername !== username) {
            user.username = newUsername;
        }

        // Update email jika ada perubahan
        if (newEmail && newEmail !== email) {
            user.email = newEmail;
        }

        // Update password jika ada perubahan
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Simpan perubahan
        await user.save();

        res.redirect('/profile');
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).render('error', { error: 'Internal server error' });
    }
});

module.exports = router;
