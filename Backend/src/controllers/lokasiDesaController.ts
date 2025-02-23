import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as lokasiDesaServices from '../services/lokasiDesaServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createLokasiDesa = async (req: Request, res: Response) => {
  try {
    const { id_kabupaten, kode_desa, nama_desa } = req.body;
    if (!nama_desa) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await lokasiDesaServices.createLokasiDesaService(id_kabupaten, kode_desa, nama_desa);
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
export const getLokasiDesas = async (req: Request, res: Response) => {
  try {
    const results = await lokasiDesaServices.getLokasiDesasJoinService();
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

export const getLokasiDesa = async (req: Request, res: Response) => {
  try {
    const { id_progress } = req.params
    const results = await lokasiDesaServices.getLokasiDesaJoinService( Number(id_progress) );
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
export const updateLokasiDesas = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id_kabupaten, kode_kecamatan, nama_kecamatan } = req.body;

    if (!nama_kecamatan) return res.status(400).json({ message: 'Isi Jenis izin' });

    const results = (await lokasiDesaServices.updateLokasiDesaService(Number(id), id_kabupaten, kode_kecamatan, nama_kecamatan)) as ResultSetHeader;

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
export const deleteLokasiDesas = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await lokasiDesaServices.deleteLokasiDesaService(Number(id))) as ResultSetHeader;

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
