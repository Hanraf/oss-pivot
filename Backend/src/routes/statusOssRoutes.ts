import { Router } from 'express';
import * as statusOssController from '../controllers/statusOssController';

export const statusOssRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: statusOssController.createStatusOss },
  { method: 'get', path: '/', handler: statusOssController.getStatusOsss },
  { method: 'get', path: '/:id', handler: statusOssController.getStatusOss },
  { method: 'put', path: '/:id', handler: statusOssController.updateStatusOss },
  { method: 'delete', path: '/:id', handler: statusOssController.deleteStatusOss },
] as const;

routes.forEach(({ method, path, handler }) => {
  (statusOssRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});