import mysql from 'mysql2';

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: ''
    },
    console.log(`Connected to the movies_db database.`)
  );


  export default db;