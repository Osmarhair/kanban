const sqlite3 = require("sqlite3").verbose();
const bd = new sqlite3.Database("./users.bd");

bd.serialize(() => {
    bd.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
        )
    `);
});

module.exports = bd;