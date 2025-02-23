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
  app.use('/api/daftar_permohonan', Routes.daftarPermohonanRoutes);
  app.use('/api/status_progress', Routes.statusProgressRoutes)
  app.use('/api/status_oss', Routes.statusOssRoutes)
  app.use('/api/lokasi_kecamatan', Routes.lokasiKecamatanRoutes)
  app.use('/api/lokasi_Kabupaten', Routes.lokasiKabupatenRoutes)
  app.use('/api/lokasi_Kabupaten', Routes.lokasiDesaRoutes)
  app.use('/api/badan_usaha', Routes.badanUsahaRoutes)
  app.use('/api/daftar_evaluator_permohonan', Routes.daftarEvaluatorPermohonanRoutes)
};

setupMiddleware();
setupRoutes();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});