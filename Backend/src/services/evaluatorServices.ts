import connection from '../config/db';

export const createevaluatorService = async (nama_evaluator: string) => {
  const query = "INSERT INTO evaluator (nama_evaluator) VALUES (?)";
  const [results] = await connection.promise().query(query, [nama_evaluator]);
  return results;
};

export const getevaluatorsService = async () => {
  const query = "SELECT * FROM evaluator WHERE deleted_at IS NULL";
  const [results] = await connection.promise().query(query);
  return results;
};

export const getEvaluatorService = async (id_evaluator: string) => {
  const query = "SELECT * FROM evaluator WHERE id_evaluator = ? deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [id_evaluator]);
  return results
}

export const updateevaluatorService = async (id: string, nama_evaluator: string) => {
  const query = "UPDATE evaluator SET nama_evaluator = ? WHERE id_evaluator = ? AND deleted_at IS NULL";
  const [results] = await connection.promise().query(query, [nama_evaluator, id]);
  return results;
};

export const deleteevaluatorService = async (id: string) => {
  const query = "UPDATE evaluator SET deleted_at = NOW() WHERE id_evaluator = ?";
  const [results] = await connection.promise().query(query, [id]);
  return results;
};
