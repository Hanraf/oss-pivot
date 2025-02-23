import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import connection from '../config/db';
import { ResponseSuccess } from '../model/Response/responseSuccess';

export const createEvaluator = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name){
    console.error('Insert name');
    res.status(400).json({ message: 'name required' });
    return;
  };

  const query = "INSERT INTO evaluator (nama_evaluator) VALUES (?)";
  connection.query(query, [name], (err, results) => {
    if (err){
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(201).json(response);
  });
};

export const getEvaluators = (req: Request, res: Response) => {
  const query = "SELECT * FROM evaluator WHERE deleted_at IS NULL";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json(response);
  });
};

export const updateEvaluator = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'name required' });
    return;
  } else if (!id){
    res.status(400).json({ message: 'id required' });
    return;
  }

  const query = "UPDATE evaluator SET nama_evaluator = ? WHERE id_evaluator = ? AND deleted_at IS NULL";
  connection.query(query, [name, id], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const result = results as ResultSetHeader;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'evaluator not found' });
    }

    const response: ResponseSuccess = {
      message: 'success',
      data: results
    }
    return res.status(200).json({ response });
  });
};

export const deleteEvaluator = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Invalid Request' });
    return;
  }

  const query = "UPDATE evaluator SET deleted_at = NOW() WHERE id_evaluator = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const result = results as ResultSetHeader;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'evaluator not found' });
      
    }

    return res.status(200).json({ message: 'success' });
  });
};