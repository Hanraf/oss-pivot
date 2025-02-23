import express from 'express';
import cors from 'cors';
import * as Routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const setupMiddleware = () => {
  app.use(cors());
  app.use(express.json());
};

const setupRoutes = () => {
  app.use('/api/operator', Routes.operatorRoutes);
  app.use('/api/evaluator', Routes.evaluatorRoutes);
  app.use('/api/jenis_izin', Routes.jenisIzinRoutes);
};

setupMiddleware();
setupRoutes();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});