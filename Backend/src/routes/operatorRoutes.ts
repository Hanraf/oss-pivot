import { Router } from 'express';
import * as OperatorController from '../controllers/operatorController';

export const operatorRoutes = Router();

const routes = [
  { method: 'post', path: '/', handler: OperatorController.createOperator },
  { method: 'get', path: '/', handler: OperatorController.getOperators },
  { method: 'get', path: '/:id', handler: OperatorController.getOperator },
  { method: 'put', path: '/:id', handler: OperatorController.updateOperator },
  { method: 'delete', path: '/:id', handler: OperatorController.deleteOperator },
] as const;

routes.forEach(({ method, path, handler }) => {
  (operatorRoutes[method as keyof Omit<Router, "use">] as Function)(path, handler);
});