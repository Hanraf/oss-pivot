import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as statusOssServices from '../services/statusOssServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createStatusOss = async (req: Request, res: Response) => {
  try {
    const { nama_status_progress } = req.body;
    if (!nama_status_progress) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await statusOssServices.createStatusOssService(nama_status_progress);
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
export const getStatusOsss = async (req: Request, res: Response) => {
  try {
    const results = await statusOssServices.getStatusOsssService();
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

export const getStatusOss = async (req: Request, res: Response) => {
  try {
    const { id_progress } = req.params
    const results = await statusOssServices.getStatusOssService( Number(id_progress) );
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
export const updateStatusOss = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama_status_progress } = req.body;

    if (!nama_status_progress) return res.status(400).json({ message: 'Isi Jenis izin' });

    const results = (await statusOssServices.updateStatusOssService(Number(id), nama_status_progress)) as ResultSetHeader;

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
export const deleteStatusOss = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await statusOssServices.deleteStatusOssService(Number(id))) as ResultSetHeader;

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
