import connection from '../config/db';

export const createOperatorService = async (nama_operator: string) => {
  const query = "INSERT INTO operator (nama_operator) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_operator]);
  return results;
};

export const getOperatorsService = async () => {
  const query = "SELECT * FROM operator WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getOperatorService = async (id_operator: string) => {
  const query = "SELECT * FROM operator WHERE id_operator = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_operator]);
  return results
}

export const updateOperatorService = async (id: string, nama_operator: string) => {
  const query = "UPDATE operator SET nama_operator = ? WHERE id_operator = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_operator, id]);
  return results;
};

export const deleteOperatorService = async (id: string) => {
  const query = "UPDATE operator SET deleted_at = NOW() WHERE id_operator = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
