import { generateToken } from './jwt.js';
import { users } from './users.js';
import argon2 from 'argon2';

/**
 * * Bejelentkező függvény
 * * Bemenet: Vár egy 'username' és egy 'password' mezőt a request body-ban
 * * Megvizsgálja a fiók létezését és hogy helyes-e a jelszó
 * Létrehoz 2 tokent majd elküldi a felhasználónak 
 */


export function Login(req, res, next) {
  try {
    // Adatok kinyerése
    const { username, password } = req.body;

    // Felhasználó és jelszó validálás
    if (!username, !password) return res.status(400).json({ message: 'Not enough fields provided!' });
    if (!users[username]) return res.status(400).json({ message: 'Invalid username or password!' });
    if (!argon2.verify(users[username].password, password)) return res.status(400).json({ message: 'Invalid username or password!' });


    const user = {
      username: username,
      rights: users[username].rights,
    }
    console.log(user)
    // Tokenek létrehozása
    const token = {
      username: user.username
    }
    const tokenCookie = generateToken(token); // Token létrehozása


    // Token cookie elküldése 
    res.cookie('token', tokenCookie, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Max 7 napig érvényes
      secure: false, // Csak HTTPS-en keresztül legyen elérhető
      httpOnly: true  // Csak a szerver tudja elolvasni
    });

    return res.status(200).json({ message: 'Login successful', data: user });

  } catch (error) {
    next(error)
  }
}

export function checkAuth(req, res, next) {
  const username = res.user.username;
  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const user = {
    username: username,
    rights: users[username].rights,
  };
  
  return res.status(200).json({ data: user });
}

/**
 * Kijelentkező függvény
 * Kitörli az összes cookiet és elküld egy sikereres választ
 */
export function Logout(req, res, next) {
  res.clearCookie('token');
  res.clearCookie('rights');
  return res.status(200).json({ message: 'Logout successful' });
}