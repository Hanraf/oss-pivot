import connection from '../config/db';

export const createStatusOssService = async (nama_status: string) => {
  const query = "INSERT INTO status_oss (nama_status) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_status]);
  return results;
};

export const getStatusOsssService = async () => {
  const query = "SELECT * FROM status_oss WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getStatusOssService = async (id_status_oss: number) => {
  const query = "SELECT * FROM status_oss WHERE id_status_oss = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_status_oss]);
  return results
}

export const updateStatusOssService = async (id_status_oss: number, nama_status: string) => {
  const query = "UPDATE status_oss SET nama_status = ? WHERE id_status_oss = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_status, id_status_oss]);
  return results;
};

export const deleteStatusOssService = async (id_status_oss: number) => {
  const query = "UPDATE status_oss SET deleted_at = NOW() WHERE id_status_oss = ?";
  const [results] = await connection.promise().query(query, [id_status_oss]);
  return results;
};
