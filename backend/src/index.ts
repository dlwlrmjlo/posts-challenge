import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postsRouter from './routes/posts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postsRouter);

app.get('/health', (req, res) => {
    res.send('API is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
