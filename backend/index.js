import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Login, Logout, checkAuth } from './AuthController.js';
import { authenticateToken } from './jwt.js';
import {colorLog, errorLog} from 'psgutil';

const app = express();

const PORT = 3000;
const HOSTNAME = '127.0.0.1';


app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', '*'],
  credentials: true
}));

app.use(colorLog)

app.post('/login', Login);
app.post('/logout', Logout);
app.get('/me', authenticateToken, checkAuth);


app.use(errorLog)

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
})