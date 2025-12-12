import jwt from 'jsonwebtoken';

export function authenticateToken(){

}
export function generateToken(payload){
    return jwt.sign(payload, 'Token-Secret-Key', {
        expiresIn: '7d'
    });
}