const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_todo',
    namedPlaceholders: true, //prepared statements
    decimalNumbers: true,
});

module.exports = {
    pool,
}