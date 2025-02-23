import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import * as lokasiKecamatanServices from '../services/lokasiKecamatanServices';
import { ResponseSuccess } from '../model/Response/responseSuccess';

// 🔹 CREATE
export const createLokasiKecamatan = async (req: Request, res: Response) => {
  try {
    const { id_kabupaten, kode_kecamatan, nama_kecamatan } = req.body;
    if (!nama_kecamatan) return res.status(400).json({ message: 'Jenis izin required' });

    const results = await lokasiKecamatanServices.createLokasiKecamatanService(id_kabupaten, kode_kecamatan, nama_kecamatan);
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
export const getLokasiKecamatans = async (req: Request, res: Response) => {
  try {
    const results = await lokasiKecamatanServices.getLokasiKecamatansJoinService();
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

export const getLokasiKecamatan = async (req: Request, res: Response) => {
  try {
    const { id_progress } = req.params
    const results = await lokasiKecamatanServices.getLokasiKecamatanJoinService( Number(id_progress) );
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
export const updateLokasiKecamatans = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { id_kabupaten, kode_kecamatan, nama_kecamatan } = req.body;

    if (!nama_kecamatan) return res.status(400).json({ message: 'Isi Jenis izin' });

    const results = (await lokasiKecamatanServices.updateLokasiKecamatanService(Number(id), id_kabupaten, kode_kecamatan, nama_kecamatan)) as ResultSetHeader;

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
export const deleteLokasiKecamatans = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Invalid Request' });

    const results = (await lokasiKecamatanServices.deleteLokasiKecamatanService(Number(id))) as ResultSetHeader;

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
