import { Router } from 'express';
import * as jenisIzinController from '../controllers/jenisIzinController';

export const jenisIzinRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: jenisIzinController.createJenisIzin },
  { method: 'get', path: '/', handler: jenisIzinController.getJenisIzins },
  { method: 'get', path: '/:id', handler: jenisIzinController.getJenisIzin },
  { method: 'put', path: '/:id', handler: jenisIzinController.updateJenisIzin },
  { method: 'delete', path: '/:id', handler: jenisIzinController.deleteJenisIzin },
] as const;

routes.forEach(({ method, path, handler }) => {
  (jenisIzinRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});