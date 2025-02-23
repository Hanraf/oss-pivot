import connection from '../config/db';

export const createLokasiKecamatanService = async (id_kabupaten: number, kode_kecamatan: string, nama_kecamatan: string) => {
  const query = "INSERT INTO lokasi_kecamatan (id_kabupaten, kode_kecamatan, nama_kecamatan) VALUES (?,?,?)";
  const [results] = await connection.promise().query(query, [id_kabupaten, kode_kecamatan, nama_kecamatan]);
  return results;
};

export const getLokasiKecamatansService = async () => {
  const query = "SELECT * FROM lokasi_kecamatan WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getLokasiKecamatansJoinService = async () => {
  const query = `SELECT * FROM lokasi_kecamatan lkec 
                JOIN lokasi_kabupaten lkab ON lkec.id_kabupaten = lkab.id_kabupaten
                WHERE deleted_at IS NULL`;
  const [results] = await connection.promise().query(query);
  return results;
};

export const getLokasiKecamatanService = async (id_kecamatan: number) => {
  const query = "SELECT * FROM lokasi_kecamatan WHERE id_kecamatan = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_kecamatan]);
  return results
}

export const getLokasiKecamatanJoinService = async (id_kecamatan: number) => {
  const query = `SELECT * FROM lokasi_kecamatan lkec 
                JOIN lokasi_kabupaten lkab ON lkec.id_kabupaten = lkab.id_kabupaten
                WHERE id_kecamatan = ? AND deleted_at IS NULL`;
  const [results] = await connection.promise().query(query, id_kecamatan);
  return results;
};

export const updateLokasiKecamatanService = async (id: number, id_kabupaten: number, kode_kecamatan: string, nama_kecamatan: string) => {
  const query = "UPDATE lokasi_kecamatan SET id_kabupaten = ?, kode_kecamatan = ?, nama_kecamatan = ? WHERE id_kecamatan = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_kabupaten, kode_kecamatan, nama_kecamatan, id]);
  return results;
};

export const deleteLokasiKecamatanService = async (id: number) => {
  const query = "UPDATE lokasi_kecamatan SET deleted_at = NOW() WHERE id_kecamatan = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
