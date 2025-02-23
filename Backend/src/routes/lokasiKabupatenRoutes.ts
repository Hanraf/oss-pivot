import { Router } from 'express';
import * as lokasiKabupatenControllerController from '../controllers/lokasiKabupatenController';

export const lokasiKabupatenRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: lokasiKabupatenControllerController.createLokasiKabupaten },
  { method: 'get', path: '/', handler: lokasiKabupatenControllerController.getLokasiKabupatens },
  { method: 'get', path: '/:id', handler: lokasiKabupatenControllerController.getLokasiKabupaten },
  { method: 'put', path: '/:id', handler: lokasiKabupatenControllerController.updateLokasiKabupatens },
  { method: 'delete', path: '/:id', handler: lokasiKabupatenControllerController.deleteLokasiKabupatens },
] as const;

routes.forEach(({ method, path, handler }) => {
  (lokasiKabupatenRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});