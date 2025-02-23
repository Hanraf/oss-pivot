import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as daftarEvaluatorPermohonanServices from '../services/daftarEvaluatorPermohonanServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';
import { EvaluatorPermohonanData } from '../model/daftarEvaluatorPermohonan';

export const createDaftarEvaluatorPermohonan = async (req: Request, res: Response) => {
  try {
    const data: Partial<EvaluatorPermohonanData> = req.body;
    if (!data) return res.status(400).json({ message: 'Data jangan kosong' });

    const results = await daftarEvaluatorPermohonanServices.createDaftarEvaluatorPermohonanService(data);
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

export const getDaftarEvaluatorsPermohonan = async (req: Request, res: Response) => {
  try {
    const results = await daftarEvaluatorPermohonanServices.getDaftarEvaluatorPermohonansService();
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

export const getDaftarEvaluatorPermohonan = async (req: Request, res: Response) => {
  try {
    const { id_evaluator_permohonan } = req.params
    const results = await daftarEvaluatorPermohonanServices.getDaftarEvaluatorPermohonanService( Number(id_evaluator_permohonan) );
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

export const updateDaftarEvaluatorPermohonan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<EvaluatorPermohonanData> = req.body;

    if (!data) return res.status(400).json({ message: 'Data kosong' });

    const results = (await daftarEvaluatorPermohonanServices.updateDaftarEvaluatorPermohonanService(Number(id), data)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Daftar evaluator permohonan not found' });
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

export const deletedaftarEvaluatorPermohonan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await daftarEvaluatorPermohonanServices.deleteDaftarEvaluatorPermohonanService(Number(id))) as ResultSetHeader;

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