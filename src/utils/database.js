const mysql = require('mysql2/promise');
 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hms_backend2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 
// Test the connection when the application starts
(async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
})();
 
const query = async (sql, values) => {
    try {
        const [results, ] = await pool.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    }
};
 
module.exports = { query, pool };
 