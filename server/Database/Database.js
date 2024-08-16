import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE
}).promise()


pool.getConnection()
    .then((connection) => {
        console.log('Database connected!');
        connection.release(); // Release the connection back to the pool
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error.message);
    });

export default pool;