import { Router } from 'express';
import * as statusProgressController from '../controllers/statusProgressController';

export const statusProgressRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: statusProgressController.createStatusProgress },
  { method: 'get', path: '/', handler: statusProgressController.getStatusProgresss },
  { method: 'get', path: '/:id', handler: statusProgressController.getStatusProgress },
  { method: 'put', path: '/:id', handler: statusProgressController.updateStatusProgress },
  { method: 'delete', path: '/:id', handler: statusProgressController.deleteStatusProgress },
] as const;

routes.forEach(({ method, path, handler }) => {
  (statusProgressRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});