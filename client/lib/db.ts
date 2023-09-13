import mysql from 'mysql2/promise';

export const query = async (sql:any, values: any) => {
  const connection = await mysql.createConnection({
    host: 'db', 
    user: 'root',
    password: 'root',
    database: 'begood',
  });

  const [results] = await connection.execute(sql, values);
  connection.end();

  return results;
};
