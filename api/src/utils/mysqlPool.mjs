import mysql from "mysql2";

const MySQL_HOST = process.env.MySQL_HOST || "mysql";
const MySQL_USER = process.env.MySQL_USER || "root";
const MySQL_PORT = process.env.MySQL_PORT || "3306";
const MySQL_PASSWORD = process.env.MySQL_PASSWORD || "password";
const MySQL_DB = process.env.MySQL_DB || "admin";

// console.log(process.env.MySQL_HOST);
// console.log(process.env.MySQL_USER);
console.log(process.env.MySQL_PORT);
// console.log(process.env.MySQL_PASSWORD);
// console.log(process.env.MySQL_DB);

const pool = mysql.createPool({
  connectionLimit: 100,
  host: MySQL_HOST,
  // host: "mysql",
  port: MySQL_PORT,
  // port: "3306",
  user: MySQL_USER,
  // user: "root",
  password: MySQL_PASSWORD,
  // password: "password",
  database: MySQL_DB,
  // database: "time_db",
});

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.getConnection((err, connection) => {
  if (!err) {
    console.log("Connected to the MySQL DB - ID is " + connection.threadId);
    const createTimeTable = CREATE_TIMES_TABLE_SQL;
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log("Times table was created");
      }
    });
    connection.release();
  }
});

export default pool;
