import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as evaluatorServices from '../services/evaluatorServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

export const createEvaluator = async (req: Request, res: Response) => {
  try {
    const { nama_evaluator } = req.body;
    if (!nama_evaluator) return res.status(400).json({ message: 'Evaluator name required' });

    const results = await evaluatorServices.createevaluatorService(nama_evaluator);
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(201).json(response);

  } catch (err) {
    console.error('Error inserting data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const getEvaluators = async (req: Request, res: Response) => {
  try {
    const results = await evaluatorServices.getevaluatorsService();
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const getEvaluator = async (req: Request, res: Response) => {
  try {
    const { id_evaluator } = req.params
    const results = await evaluatorServices.getEvaluatorService( id_evaluator );
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const updateEvaluator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_evaluator } = req.body;

    if (!nama_evaluator) return res.status(400).json({ message: 'Isi nama evaluator' });

    const results = (await evaluatorServices.updateevaluatorService(id, nama_evaluator)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Evaluator not found' });
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error updating data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};

export const deleteEvaluator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await evaluatorServices.deleteevaluatorService(id)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Evaluator not found' });

    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);

  } catch (err) {
    console.error('Error deleting data:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};