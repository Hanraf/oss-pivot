import connection from '../config/db';

export const createLokasikabupatenService = async (kode_kabupaten: string, nama_kabupaten: string) => {
  const query = "INSERT INTO lokasi_kabupaten (kode_kabupaten, nama_kabupaten) VALUES (?, ?)";
  const [results] = await connection.promise().query(query, [kode_kabupaten, nama_kabupaten]);
  return results;
};

export const getLokasikabupatensService = async () => {
  const query = "SELECT * FROM lokasi_kabupaten WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getLokasikabupatenService = async (id_kabupaten: number) => {
  const query = "SELECT * FROM lokasi_kabupaten WHERE id_kabupaten = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_kabupaten]);
  return results
}

export const updateLokasikabupatenService = async (id_kabupaten: number, nama_kabupaten: string) => {
  const query = "UPDATE lokasi_kabupaten SET nama_kabupaten = ? WHERE id_kabupaten = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_kabupaten, id_kabupaten]);
  return results;
};

export const deleteLokasikabupatenService = async (id_kabupaten: number) => {
  const query = "UPDATE lokasi_kabupaten SET deleted_at = NOW() WHERE id_kabupaten = ?";
  const [results] = await connection.promise().query(query, [id_kabupaten]);
  return results;
};
