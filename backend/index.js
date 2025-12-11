import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = 3000;
const HOSTNAME = '127.0.0.1';


app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://localhost:5173',
  credentials: true
}));

app.post('/login', Login);
app.post('/logout', Logout);





app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
})