import { Router } from 'express';
import * as daftarEvaluatorPermohonanController from '../controllers/daftarEvaluatorPermohonanController';

export const daftarEvaluatorPermohonanRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: daftarEvaluatorPermohonanController.createDaftarEvaluatorPermohonan },
  { method: 'get', path: '/', handler: daftarEvaluatorPermohonanController.getDaftarEvaluatorsPermohonan },
  { method: 'get', path: '/:id_evaluator_permohonan', handler: daftarEvaluatorPermohonanController.getDaftarEvaluatorPermohonan },
  { method: 'get', path: '/evaluator/:id_evaluator', handler: daftarEvaluatorPermohonanController.getEvaluatorPermohonan },
  { method: 'put', path: '/:id', handler: daftarEvaluatorPermohonanController.updateDaftarEvaluatorPermohonan },
  { method: 'delete', path: '/:id', handler: daftarEvaluatorPermohonanController.deletedaftarEvaluatorPermohonan },
] as const;

routes.forEach(({ method, path, handler }) => {
  (daftarEvaluatorPermohonanRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});