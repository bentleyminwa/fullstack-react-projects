import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { postsRouter } from './routes/posts.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

postsRouter(app);

app.get('/', (req, res) => {
  res.send('Hello from express!');
});

export { app };
