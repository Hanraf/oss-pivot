import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as jenisIzinServices from '../services/jenisIzinServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createJenisIzin = async (req: Request, res: Response) => {
  try {
    const { nama_jenis_izin } = req.body;
    if (!nama_jenis_izin) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await jenisIzinServices.createJenisIzinService(nama_jenis_izin);
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
export const getJenisIzins = async (req: Request, res: Response) => {
  try {
    const results = await jenisIzinServices.getJenisIzinsService();
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

export const getJenisIzin = async (req: Request, res: Response) => {
  try {
    const { id_jenis_izin } = req.params
    const results = await jenisIzinServices.getJenisIzinService( id_jenis_izin );
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
export const updateJenisIzin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_jenis_izin } = req.body;

    if (!nama_jenis_izin) return res.status(400).json({ message: 'Isi Jenis izin' });

    const results = (await jenisIzinServices.updateJenisIzinService(id, nama_jenis_izin)) as ResultSetHeader;

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
export const deleteJenisIzin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await jenisIzinServices.deleteJenisIzinService(id)) as ResultSetHeader;

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
