import express, { Request, Response } from 'express';
import cors from 'cors';
import { operatorRoutes } from './routes/operatorRoutes';
import { evaluatorRoutes } from './routes/evaluatorRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/operator', operatorRoutes);
app.use('/api/evaluator', evaluatorRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});