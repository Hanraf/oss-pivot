import { Router } from 'express';
import * as badanUsahaController from '../controllers/badanUsahaController';

export const badanUsahaRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: badanUsahaController.createBadanUsaha },
  { method: 'get', path: '/', handler: badanUsahaController.getBadanUsahas },
  { method: 'get', path: '/:id', handler: badanUsahaController.getBadanUsaha },
  { method: 'put', path: '/:id', handler: badanUsahaController.updateBadanUsaha },
  { method: 'delete', path: '/:id', handler: badanUsahaController.deleteBadanUsaha },
] as const;

routes.forEach(({ method, path, handler }) => {
  (badanUsahaRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});