import { generateToken } from './jwt.js';
import users from './users.js';
import argon2 from 'argon2';

export function Login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username, !password) return res.status(400).json({ message: 'Not enough fields provided!' });

    if (!users[username]) return res.status(400).json({ message: 'Invalid username or password!' });

    if (!argon2.verify(users[username].password, password)) return res.status(400).json({ message: 'Invalid username or password!' });

    const token = {
      username: username
    }
    const tokenCookie = generateToken(token);

    const rights = {
      rights: users[username].rights
    }

    res.cookie('token', tokenCookie, {
      maxAge: "7d",
      secure: false,
      httpOnly: true
    });
    res.cookie('rights', rights, {
      httpOnly: false
    });
    return res.status(200).status({ message: 'Login successful', data: { username: username } });

  } catch (error) {
    console.error(error);
  }
}
export function Logout(req, res, next) {
  res.clearCookies();
  return res.status(200).status({ message: 'Logout successful' });
}