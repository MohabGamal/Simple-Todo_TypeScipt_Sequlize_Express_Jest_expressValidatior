import express from 'express';
import todoRouter from './todo/route';

const app = express();
app.use(express.json());

app.use(todoRouter);

export default app;
