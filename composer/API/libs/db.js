const sqlite3 = require('sqlite3').verbose();

// open the database
module.exports = new sqlite3.Database('./db/presentations.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }

    console.log('Connected to the presentations database.');
});