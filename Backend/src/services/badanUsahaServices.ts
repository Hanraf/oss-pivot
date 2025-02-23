import connection from '../config/db';

export const createBadanUsahaService = async (nama_badan_usaha: string) => {
  const query = "INSERT INTO badan_usaha (nama_badan_usaha) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_badan_usaha]);
  return results;
};

export const getBadanUsahasService = async () => {
  const query = "SELECT * FROM badan_usaha WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getBadanUsahaService = async (id_badan_usaha: number) => {
  const query = "SELECT * FROM badan_usaha WHERE id_badan_usaha = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_badan_usaha]);
  return results
}

export const updateBadanUsahaService = async (id_badan_usaha: number, nama_badan_usaha: string) => {
  const query = "UPDATE badan_usaha SET nama_badan_usaha = ? WHERE id_badan_usaha = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_badan_usaha, id_badan_usaha]);
  return results;
};

export const deleteBadanUsahaService = async (id: number) => {
  const query = "UPDATE badan_usaha SET deleted_at = NOW() WHERE id_badan_usaha = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
