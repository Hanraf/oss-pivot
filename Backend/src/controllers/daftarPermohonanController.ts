import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as daftarPermohonanServices from '../services/daftarPermohonanServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';
import { PermohonanData } from '../model/daftarPermohonan';

export const createDaftarPermohonan = async (req: Request, res: Response) => {
  try {
    const data: Partial<PermohonanData> = req.body;
    if (!data) return res.status(400).json({ message: 'Data jangan kosong' });

    const results = await daftarPermohonanServices.createDaftarPermohonanService(data);
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

export const getDaftarPermohonans = async (req: Request, res: Response) => {
  try {
    const results = await daftarPermohonanServices.getDaftarPermohonansService();
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

export const getDaftarPermohonansJoin = async (req: Request, res: Response) => {
  try {
    const results = await daftarPermohonanServices.getDaftarPermohonansJoinService();
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

export const getDaftarPermohonan = async (req: Request, res: Response) => {
  try {
    const { id_evaluator_permohonan } = req.params
    const results = await daftarPermohonanServices.getDaftarPermohonanJoinService( id_evaluator_permohonan );
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

export const updateDaftarPermohonan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<PermohonanData> = req.body;

    if (!data) return res.status(400).json({ message: 'Isi nama evaluator' });

    const results = (await daftarPermohonanServices.updateDaftarPermohonanService(Number(id), data)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Daftar permohonan not found' });
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

export const deleteDaftarPermohonan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await daftarPermohonanServices.deleteDaftarPermohonanService(id)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Daftar permohonan not found' });

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