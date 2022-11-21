const sqlite3 = require("sqlite3");

const DB_ADDR = ":memory:";

const artist = [
    {
        artistname: "1lameuser",
        city: "secret_password"
    },
    {
        artistname: "cool_user_87",
        city: "notPassword!"
    },
];

const initDB = () => {
    const db = new sqlite3.Database(DB_ADDR);
    db.serialize(() => {
        db.run(`CREATE TABLE artist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            artistname TEXT UNIQUE,
            city TEXT
        )`);

        const insertStmt = db.prepare("INSERT INTO artist(artistname,city) VALUES (?,?)");
        artist.forEach(({ artistname, city}, i) => {
            insertStmt.run([artistname, city]);
        })
        insertStmt.finalize();
    });
    return db;
};

module.exports = { initDB };