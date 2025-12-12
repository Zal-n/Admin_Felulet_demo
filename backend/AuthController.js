import { generateToken } from './jwt.js';
import users from './users.js';
import argon2 from 'argon2';

/**
 * Bejelentkező függvény
 * Bemenet: Vár egy 'username' és egy 'password' mezőt a request body-ban
 * Megvizsgálja a fiók létezését és hogy helyes-e a jelszó
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

    // Tokenek létrehozása
    const token = {
      username: username
    }
    const tokenCookie = generateToken(token); // Token létrehozása

    const rights = {
      rights: users[username].rights
    }


    // Token cookie elküldése 
    res.cookie('token', tokenCookie, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Max 7 napig érvényes
      secure: false, // Csak HTTPS-en keresztül legyen elérhető
      httpOnly: true  // Csak a szerver tudja elolvasni
    });

    // Jogosultságok elküldése
    res.cookie('rights', rights, {
      httpOnly: false // A kliens is el tudja olvasni
    });
    return res.status(200).status({ message: 'Login successful', data: { username: username } });

  } catch (error) {
    console.error(error);
  }
}

/**
 * Kijelentkező függvény
 * Kitörli az összes cookiet és elküld egy sikereres választ
 */
export function Logout(req, res, next) {
  res.clearCookies();
  return res.status(200).status({ message: 'Logout successful' });
}