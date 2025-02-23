import connection from '../config/db';

export const createJenisIzinService = async (nama_jenis_izin: string) => {
  const query = "INSERT INTO jenis_izin (nama_jenis_izin) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_jenis_izin]);
  return results;
};

export const getJenisIzinsService = async () => {
  const query = "SELECT * FROM jenis_izin WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getJenisIzinService = async (id_jenis_izin: string) => {
  const query = "SELECT * FROM jenis_izin WHERE id_jenis_izin = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_jenis_izin]);
  return results
}

export const updateJenisIzinService = async (id: string, nama_jenis_izin: string) => {
  const query = "UPDATE jenis_izin SET nama_jenis_izin = ? WHERE id_jenis_izin = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_jenis_izin, id]);
  return results;
};

export const deleteJenisIzinService = async (id: string) => {
  const query = "UPDATE jenis_izin SET deleted_at = NOW() WHERE id_jenis_izin = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
