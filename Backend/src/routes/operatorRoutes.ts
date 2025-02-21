import { Router } from 'express';
import { createOperator, getOperators, updateOperator, deleteOperator } from '../controllers/operatorController';

export const operatorRoutes = Router();

operatorRoutes.post('/', createOperator);
operatorRoutes.get('/', getOperators);
operatorRoutes.put('/:id', updateOperator);
operatorRoutes.delete('/:id', deleteOperator);