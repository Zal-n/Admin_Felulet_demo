import jwt from 'jsonwebtoken';
const TOKEN_SECRET = 'Token-Secret-Key';


/** * Middleware a token hitelesítéséhez
 * Ellenörzi hogy a kliens küldett-e tokent majd validálja azt
 * Ha sikeres, hozzáadja a dekódolt tokent a response objektumhoz 
 * és meghívja a következő middleware-t
 * A következő függvény res.user-ként érheti el a dekódolt tokent
 * 
 * 
 */
export function authenticateToken(req, res, next) {
    if(!token) return res.status(401).json({message: 'No token!'});
    const token = req.cookies('token');

    const decoded = jwt.verify(token, TOKEN_SECRET);
    if(!decoded) return res.status(403).json({message: 'Invalid token!'});

    res.user = decoded;
    next(); // Következő middleware meghívása
}

/**
 * Generál egy jwt tokent a megadott payloaddal
 * @param {*} payload 
 * @return {string} JWT token
 */
export function generateToken(payload) {
    return jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: '7d' // 7 napig érvényes
    });
}