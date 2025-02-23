import { Router } from 'express';
import * as evaluatorController from '../controllers/evaluatorController';

export const evaluatorRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: evaluatorController.createEvaluator },
  { method: 'get', path: '/', handler: evaluatorController.getEvaluators },
  { method: 'get', path: '/:id', handler: evaluatorController.getEvaluator },
  { method: 'put', path: '/:id', handler: evaluatorController.updateEvaluator },
  { method: 'delete', path: '/:id', handler: evaluatorController.deleteEvaluator },
] as const;

routes.forEach(({ method, path, handler }) => {
  (evaluatorRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});