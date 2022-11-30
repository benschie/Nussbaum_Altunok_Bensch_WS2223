const sqlite3 = require("sqlite3");

const DB_ADDR = ":memory:";

const artist = [
    {
        artistname: "Ed Sheeran",
        cityname: "Köln"
    },
    {
        artistname: "Snoop Dogg",
        cityname: "Berlin"
    },
    {
        artistname: "Justin Bieber",
        cityname: "München"
    },
    {
        artistname: "Ariana Grande",
        cityname: "Köln"
    },
];

const ort = [
    {
        cityname: "Köln",
        nearestHotels: "Hyatt Regency Köln, Pullman Köln, Steigenberger Hotel Köln, 25hours Hotel Koeln The Circle"
    },
    {
        cityname: "Berlin",
        nearestHotels: "Steigenberger Hotel am Kanzleramt, Hotel Adlon Kempinski Berlin, Titanic Gendarmenmarkt Berlin, fjord hotel berlin"
    },
    {
        cityname: "München",
        nearestHotels: "Hotel Cocoon Stachus, Steigenberger Hotel München, Maritim Hotel München, Hyperion Hotel München"
    },
];

const initDB = () => {
    const db = new sqlite3.Database(DB_ADDR);
    db.serialize(() => {
        db.run(`CREATE TABLE artist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            artistname TEXT UNIQUE,
            cityname TEXT
        )`);

        const insertArtist = db.prepare("INSERT INTO artist(artistname,cityname) VALUES (?,?)");
        artist.forEach(({ artistname, cityname}, i) => {
            insertArtist.run([artistname, cityname]);
        })
        insertArtist.finalize();


        db.run(`CREATE TABLE ort (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cityname TEXT UNIQUE,
            nearestHotels TEXT
        )`);
        const insertConcert = db.prepare("INSERT INTO ort(cityname,nearestHotels) VALUES (?,?)");
        ort.forEach(({cityname,nearestHotels}, i) => {
            insertConcert.run([cityname,nearestHotels]);
        })
        insertConcert.finalize();

    });
    return db;
};

module.exports = { initDB };