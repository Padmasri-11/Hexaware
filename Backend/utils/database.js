const mysql = require('mysql2/promise');
const config = require('../config/database');

let pool;

async function getConnection() {
    if (!pool) {
        pool = mysql.createPool(config);
    }
    return pool.getConnection();
}

module.exports = {
    getConnection
};