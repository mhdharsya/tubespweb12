const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers.authorization

if (!token) {
    return res.status(401).json({
        message: 'Token tidak ditemukan'
    })
}

try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
}

catch (error) {
    return res.status(403).json(
        { message: 'Token tidak valid' }
    )
}
}
module.exports = validateToken;