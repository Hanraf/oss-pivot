import { Router } from 'express';
import * as daftarPermohonanController from '../controllers/daftarPermohonanController';

export const daftarPermohonanRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: daftarPermohonanController.createDaftarPermohonan },
  { method: 'get', path: '/', handler: daftarPermohonanController.getDaftarPermohonansJoin },
  { method: 'get', path: '/:id', handler: daftarPermohonanController.getDaftarPermohonansJoin },
  { method: 'put', path: '/:id', handler: daftarPermohonanController.updateDaftarPermohonan },
  { method: 'delete', path: '/:id', handler: daftarPermohonanController.deleteDaftarPermohonan },
] as const;

routes.forEach(({ method, path, handler }) => {
  (daftarPermohonanRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});