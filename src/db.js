require("dotenv").config();
const mysql = require("mysql2/promise");

//Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Query function
async function query(sql, values) {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query(sql, values);
        return rows;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        conn.release();
    }
}

//Test function
async function test() {
    const rows = await query('SELECT 1 AS ok');
    return rows[0].ok === 1;
}

module.exports = { query, db, test };