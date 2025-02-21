import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

interface DBConnection {
  connection: Connection;
}

const connection: DBConnection = {
  connection: mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3308,
  }),
};

connection.connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default connection.connection;
