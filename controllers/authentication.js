const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username dan password harus diisi'
            })
        }
        
        const isMatch = await bcrypt.compare(password, encrypted);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Username dan password salah'
                })
            }

        const token = jwt.sign({
            id: user.id,
            username: user.username,

        },
        SECRET_KEY,
        {expiresIn: '1h'});

        res.status(200).json({
            message: 'Login berhasil',
            token: token
        });

    } catch (error) {
    return res.status(500).json({
        message : 'Errorrrrrrrrr'
})
}
}