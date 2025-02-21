import { Request, Response } from 'express';
import connection from '../config/db';

export const createOperator = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name){
    console.error('Insert name');
    res.status(400).json({ message: 'name required' });
    return;
  };

  const query = "INSERT INTO operator (name) VALUES (?)";
  connection.query(query, [name], (err, results) => {
    if (err){
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.status(201).json({
      results
    });
  });
};

export const getOperators = (req: Request, res: Response) => {
  const query = "SELECT * FROM operator";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    return res.json(results);
  });
};

export const updateOperator = (req: Request, res: Response) => {
  res.status(501).json({ message: "Update not implemented" });
};

export const deleteOperator = (req: Request, res: Response) => {
  res.status(501).json({ message: "Update not implemented" });
};