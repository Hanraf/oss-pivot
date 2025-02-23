import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as lokasiKabupatenServices from '../services/lokasiKabupatenServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createLokasiKabupaten = async (req: Request, res: Response) => {
  try {
    const { kode_kabupaten, nama_kabupaten } = req.body;
    if (!nama_kabupaten) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await lokasiKabupatenServices.createLokasikabupatenService(kode_kabupaten, nama_kabupaten);
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
export const getLokasiKabupatens = async (req: Request, res: Response) => {
  try {
    const results = await lokasiKabupatenServices.getLokasikabupatensService();
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

export const getLokasiKabupaten = async (req: Request, res: Response) => {
  try {
    const { id_kabupaten } = req.params
    const results = await lokasiKabupatenServices.getLokasikabupatenService( Number(id_kabupaten) );
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
export const updateLokasiKabupatens = async (req: Request, res: Response) => {
  try {
    const { id_kabupaten } = req.params;
    const { kode_kabupaten, nama_kabupaten } = req.body;

    if (!nama_kabupaten || !kode_kabupaten) return res.status(400).json({ message: 'Isi Data' });

    const results = (await lokasiKabupatenServices.updateLokasikabupatenService(Number(id_kabupaten), kode_kabupaten, nama_kabupaten)) as ResultSetHeader;

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
export const deleteLokasiKabupatens = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await lokasiKabupatenServices.deleteLokasikabupatenService(Number(id))) as ResultSetHeader;

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
