import { Router } from 'express';
import * as lokasiKecamatanControllerController from '../controllers/lokasiKecamatanController';

export const lokasiKecamatanRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: lokasiKecamatanControllerController.createLokasiKecamatan },
  { method: 'get', path: '/', handler: lokasiKecamatanControllerController.getLokasiKecamatans },
  { method: 'get', path: '/:id', handler: lokasiKecamatanControllerController.getLokasiKecamatan },
  { method: 'put', path: '/:id', handler: lokasiKecamatanControllerController.updateLokasiKecamatans },
  { method: 'delete', path: '/:id', handler: lokasiKecamatanControllerController.deleteLokasiKecamatans },
] as const;

routes.forEach(({ method, path, handler }) => {
  (lokasiKecamatanRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});