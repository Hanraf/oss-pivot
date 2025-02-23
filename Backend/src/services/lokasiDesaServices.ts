import connection from '../config/db';

export const createLokasiDesaService = async (id_kecamatan: number, kode_desa: string, nama_desa: string) => {
  const query = "INSERT INTO lokasi_desa (id_kecamatan, kode_desa, nama_desa) VALUES (?,?,?)";
  const [results] = await connection.promise().query(query, [id_kecamatan, kode_desa, nama_desa]);
  return results;
};

export const getLokasiDesasService = async () => {
  const query = "SELECT * FROM lokasi_desa WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getLokasiDesasJoinService = async () => {
  const query = `SELECT * FROM lokasi_desa ldes 
                JOIN lokasi_kecamatan lkab ON lkec.id_kecamatan = ldes.id_desa
                WHERE deleted_at IS NULL`;
  const [results] = await connection.promise().query(query);
  return results;
};

export const getLokasiDesaService = async (id_desa: number) => {
  const query = "SELECT * FROM lokasi_desa WHERE id_desa = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_desa]);
  return results
}

export const getLokasiDesaJoinService = async (id_desa: number) => {
  const query = `SELECT * FROM lokasi_desa ldes 
                JOIN lokasi_kecamatan lkab ON lkec.id_kecamatan = ldes.id_desa
                WHERE id_desa = ? deleted_at IS NULL`;
  const [results] = await connection.promise().query(query, id_desa);
  return results;
};

export const updateLokasiDesaService = async (id_desa: number, id_kecamatan: number, kode_desa: string, nama_desa: string) => {
  const query = "UPDATE lokasi_desa SET id_kecamatan = ?, kode_desa = ?, nama_desa = ? WHERE id_desa = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_kecamatan, kode_desa, nama_desa, id_desa]);
  return results;
};

export const deleteLokasiDesaService = async (id_desa: number) => {
  const query = "UPDATE lokasi_desa SET deleted_at = NOW() WHERE id_desa = ?";
  const [results] = await connection.promise().query(query, [id_desa]);
  return results;
};
