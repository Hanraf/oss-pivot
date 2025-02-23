import connection from '../config/db';
import { PermohonanData } from '../model/daftarPermohonan';

export const createDaftarPermohonanService = async (data: Partial<PermohonanData>) => {
  const query = "INSERT INTO daftar_permohonan (id_jenis_izin, id_badan_usaha, id_status_oss, id_progress, id_kabupaten, id_kecamatan, id_desa, tautan_dokumen, nomor_permohonan, tanggal_permohonan, alamat, modal_usaha, tanggal_selesai_permohonan, durasi_permohonan_menit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const [results] = await connection.promise().query(query, [
    data.id_jenis_izin,
    data.id_badan_usaha,
    data.id_status_oss,
    data.id_progress,
    data.id_kabupaten,
    data.id_kecamatan,
    data.id_desa,
    data.tautan_dokumen,
    data.nomor_permohonan,
    data.tanggal_permohonan,
    data.alamat,
    data.modal_usaha,
    data.tanggal_selesai_permohonan,
    data.durasi_permohonan_menit,
  ]);
  return results;
};

export const getDaftarPermohonansService = async () => {
  const query = "SELECT * FROM daftar_permohonan WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getDaftarPermohonanJoinService = async (id_permohonan: string) => {
  const query = `SELECT 
                    * 
                FROM daftar_permohonan dp
                JOIN jenis_izin ji ON dp.id_jenis_izin = ji.id_jenis_izin
                JOIN badan_usaha bu ON dp.id_badan_usaha = bu.id_badan_usaha
                JOIN status_oss so ON dp.id_status_oss = so.id_status_oss
                JOIN progress p ON dp.id_progress = p.id_progress
                JOIN lokasi_kabupaten lkab ON dp.id_kabupaten = lkab.id_kabupaten
                JOIN lokasi_kecamatan lkec ON dp.id_kecamatan = lkec.id_kecamatan
                JOIN lokasi_desa ldes ON dp.id_desa = ldes.id_desa
                WHERE dp.id_permohonan = ? AND dp.deleted_at IS NULL`;
  const [results] = await connection.promise().query(query, [id_permohonan]);
  return results
};

export const getDaftarPermohonansJoinService = async () => {
  const query = `SELECT 
                    * 
                FROM daftar_permohonan dp
                JOIN jenis_izin ji ON dp.id_jenis_izin = ji.id_jenis_izin
                JOIN badan_usaha bu ON dp.id_badan_usaha = bu.id_badan_usaha
                JOIN status_oss so ON dp.id_status_oss = so.id_status_oss
                JOIN progress p ON dp.id_progress = p.id_progress
                JOIN lokasi_kabupaten lkab ON dp.id_kabupaten = lkab.id_kabupaten
                JOIN lokasi_kecamatan lkec ON dp.id_kecamatan = lkec.id_kecamatan
                JOIN lokasi_desa ldes ON dp.id_desa = ldes.id_desa
                WHERE dp.deleted_at IS NULL`;
  const [result] = await connection.promise().query(query);
  return result;
}

export const updateDaftarPermohonanService = async (id: number, data: Partial<PermohonanData>) => {
  const query = `
  UPDATE daftar_permohonan 
  SET 
    id_jenis_izin = ?, 
    id_badan_usaha = ?, 
    id_status_oss = ?, 
    id_progress = ?, 
    id_kabupaten = ?, 
    id_kecamatan = ?, 
    id_desa = ?, 
    tautan_dokumen = ?, 
    nomor_permohonan = ?, 
    tanggal_permohonan = ?, 
    alamat = ?, 
    modal_usaha = ?, 
    tanggal_selesai_permohonan = ?, 
    durasi_permohonan_menit = ?
  WHERE id_permohonan = ? AND deleted_at IS NULL`;

  try {
    const [results] = await connection.promise().query(query, [
      data.id_jenis_izin,
      data.id_badan_usaha,
      data.id_status_oss,
      data.id_progress,
      data.id_kabupaten,
      data.id_kecamatan,
      data.id_desa,
      data.tautan_dokumen,
      data.nomor_permohonan,
      data.tanggal_permohonan,
      data.alamat,
      data.modal_usaha,
      data.tanggal_selesai_permohonan,
      data.durasi_permohonan_menit,
      id,
    ]);
    return results ; 
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error");
  };

  
};

export const deleteDaftarPermohonanService = async (id: string) => {
  const query = "UPDATE daftar_permohonan SET deleted_at = NOW() WHERE id_kabupaten = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
