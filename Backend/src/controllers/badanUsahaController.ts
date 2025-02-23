import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as badanUsahaServices from '../services/badanUsahaServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createBadanUsaha = async (req: Request, res: Response) => {
  try {
    const { nama_status_progress } = req.body;
    if (!nama_status_progress) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await badanUsahaServices.createBadanUsahaService(nama_status_progress);
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

// 🔹 READ
export const getBadanUsahas = async (req: Request, res: Response) => {
  try {
    const results = await badanUsahaServices.getBadanUsahasService();
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

export const getBadanUsaha = async (req: Request, res: Response) => {
  try {
    const { id_progress } = req.params
    const results = await badanUsahaServices.getBadanUsahaService( Number(id_progress) );
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

// 🔹 UPDATE
export const updateBadanUsaha = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_status_progress } = req.body;

    if (!nama_status_progress) return res.status(400).json({ message: 'Isi Jenis izin' });

    const results = (await badanUsahaServices.updateBadanUsahaService(Number(id), nama_status_progress)) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Jenis izin not found' });
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

// 🔹 DELETE
export const deleteBadanUsaha = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await badanUsahaServices.deleteBadanUsahaService(Number(id))) as ResultSetHeader;

    if (results.affectedRows === 0) return res.status(404).json({ message: 'Jenis izin not found' });

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
