import { Router } from 'express';
import * as lokasiDesaControllerController from '../controllers/lokasiDesaController';

export const lokasiDesaRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: lokasiDesaControllerController.createLokasiDesa },
  { method: 'get', path: '/', handler: lokasiDesaControllerController.getLokasiDesas },
  { method: 'get', path: '/:id', handler: lokasiDesaControllerController.getLokasiDesa },
  { method: 'put', path: '/:id', handler: lokasiDesaControllerController.updateLokasiDesas },
  { method: 'delete', path: '/:id', handler: lokasiDesaControllerController.deleteLokasiDesas },
] as const;

routes.forEach(({ method, path, handler }) => {
  (lokasiDesaRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});