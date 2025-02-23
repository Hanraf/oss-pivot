import connection from '../config/db';

export const createStatusProgressService = async (nama_progress: string) => {
  const query = "INSERT INTO progress (nama_progress) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_progress]);
  return results;
};

export const getStatusProgresssService = async () => {
  const query = "SELECT * FROM progress WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getStatusProgressService = async (id_progress: number) => {
  const query = "SELECT * FROM progress WHERE id_progress = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_progress]);
  return results
}

export const updateStatusProgressService = async (id_progress: number, nama_progress: string) => {
  const query = "UPDATE progress SET nama_progress = ? WHERE id_progress = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_progress, id_progress]);
  return results;
};

export const deleteStatusProgressService = async (id_progress: number) => {
  const query = "UPDATE progress SET deleted_at = NOW() WHERE id_progress = ?";
  const [results] = await connection.promise().query(query, [id_progress]);
  return results;
};
