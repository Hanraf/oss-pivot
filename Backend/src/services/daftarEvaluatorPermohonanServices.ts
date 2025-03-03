import connection from '../config/db';
import { EvaluatorPermohonanData } from '../model/daftarEvaluatorPermohonan';

export const createDaftarEvaluatorPermohonanService = async (data: Partial<EvaluatorPermohonanData>) => {
  const query = "INSERT INTO daftar_permohonan (id_permohonan, id_evaluator, id_operator, tanggal_disposisi, tautan_disposisi, tanggal_pengecekan_evaluator, catatan_evaluasi ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const [results] = await connection.promise().query(query, [
    data.id_permohonan,
    data.id_evaluator,
    data.id_operator,
    data.tanggal_disposisi,
    data.tautan_disposisi,
    data.tanggal_pengecekan_evaluator,
    data.catatan_evaluasi,
  ]);
  return results;
};

export const getDaftarEvaluatorPermohonansService = async () => {
  const query = "SELECT * FROM daftar_permohonan WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getDaftarEvaluatorPermohonanJoinService = async () => {
  const query = `SELECT 
                    * 
                FROM daftar_evaluator_permohonan dep
                JOIN operator o ON dep.id_operator = o.id_operator
                JOIN evaluator e ON dep.id_evaluator = e.id_evaluator
                JOIN daftar_permohonan dp ON dep.id_permohonan = dp.id_permohonan
                JOIN badan_usaha bu ON dp.id_badan_usaha = bu.id_badan_usaha
                JOIN progress p ON dp.id_progress = p.id_progress
                JOIN status_oss so ON dp.id_status_oss = so.id_status_oss
                JOIN jenis_izin ji ON dp.id_jenis_izin = ji.id_jenis_izin
                JOIN lokasi_kabupaten lkab ON dp.id_kabupaten = lkab.id_kabupaten
                WHERE dep.deleted_at IS NULL`;
  const [result] = await connection.promise().query(query);
  return result;
}

export const getDaftarEvaluatorPermohonanService = async (id_evaluator_permohonan: any) => {
  const query = `SELECT 
                    * 
                FROM daftar_evaluator_permohonan dep
                JOIN operator o ON dep.id_operator = o.id_operator
                JOIN evaluator e ON dep.id_evaluator = e.id_evaluator
                JOIN daftar_permohonan dp ON dep.id_permohonan = dp.id_permohonan
                JOIN badan_usaha bu ON dp.id_badan_usaha = bu.id_badan_usaha
                JOIN progress p ON dp.id_progress = p.id_progress
                JOIN status_oss so ON dp.id_status_oss = so.id_status_oss
                JOIN jenis_izin ji ON dp.id_jenis_izin = ji.id_jenis_izin
                JOIN lokasi_kabupaten lkab ON dp.id_kabupaten = lkab.id_kabupaten
                WHERE dep.id_evaluator_permohonan = (?) AND dep.deleted_at IS NULL`;
  const [results] = await connection.promise().query(query, [id_evaluator_permohonan]);
  return results
}

export const getEvaluatorPermohonanService = async (id_evaluator: any) => {
  const query = `SELECT 
                    * 
                FROM daftar_evaluator_permohonan dep
                JOIN operator o ON dep.id_operator = o.id_operator
                JOIN evaluator e ON dep.id_evaluator = e.id_evaluator
                JOIN daftar_permohonan dp ON dep.id_permohonan = dp.id_permohonan
                JOIN badan_usaha bu ON dp.id_badan_usaha = bu.id_badan_usaha
                JOIN progress p ON dp.id_progress = p.id_progress
                JOIN status_oss so ON dp.id_status_oss = so.id_status_oss
                JOIN jenis_izin ji ON dp.id_jenis_izin = ji.id_jenis_izin
                JOIN lokasi_kabupaten lkab ON dp.id_kabupaten = lkab.id_kabupaten
                WHERE dep.id_evaluator = (?) AND dep.deleted_at IS NULL`;
  const [results] = await connection.promise().query(query, [id_evaluator]);
  return results
}

export const updateDaftarEvaluatorPermohonanService = async (id: number, data: Partial<EvaluatorPermohonanData>) => {
  const query = "UPDATE daftar_evaluator_permohonan SET id_permohonan = ?, id_evaluator = ?, id_operator = ?, tanggal_disposisi = ?, tautan_disposisi = ?, tanggal_pengecekan_evaluator = ?, catatan_evaluasi = ? WHERE id_evaluator_permohonan = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [
    data.id_permohonan,
    data.id_evaluator,
    data.id_operator,
    data.tanggal_disposisi,
    data.tautan_disposisi,
    data.tanggal_pengecekan_evaluator,
    data.catatan_evaluasi,
    id,
  ]);
  return results;
};

export const deleteDaftarEvaluatorPermohonanService = async (id_evaluator_permohonan: number) => {
  const query = "UPDATE daftar_evaluator_permohonan SET deleted_at = NOW() WHERE id_evaluator_permohonan = ?";
  const [results] = await connection.promise().query(query, [id_evaluator_permohonan]);
  return results;
};
