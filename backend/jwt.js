import jwt from 'jsonwebtoken';
const TOKEN_SECRET = 'Token-Secret-Key';

export function authenticateToken(req, res, next) {
    if(!token) return res.status(401).json({message: 'No token!'});
    const token = req.cookies('token');

    const decoded = jwt.verify(token, TOKEN_SECRET);
    if(!decoded) return res.status(403).json({message: 'Invalid token!'});

    res.user = decoded;
}
export function generateToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: '7d'
    });
}