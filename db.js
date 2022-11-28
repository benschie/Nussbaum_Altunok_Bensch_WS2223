const sqlite3 = require("sqlite3");

const DB_ADDR = ":memory:";

const artist = [
    {
        artistname: "Ed Sheeran",
        concertCity: "Köln"
    },
    {
        artistname: "Snoop Dogg",
        concertCity: "Berlin"
    },
    {
        artistname: "Justin Bieber",
        concertCity: "München"
    },
    {
        artistname: "Ariana Grande",
        concertCity: "Köln"
    },
];

const concertCity = [
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
            concertCity TEXT
        )`);
        const insertArtist = db.prepare("INSERT INTO artist(artistname,concertCity) VALUES (?,?)");
        artist.forEach(({ artistname, concertCity}, i) => {
            insertArtist.run([artistname, concertCity]);
        })
        insertArtist.finalize();


        db.run(`CREATE TABLE concertCity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cityname TEXT UNIQUE,
            nearestHotels TEXT
        )`);
        const insertConcert = db.prepare("INSERT INTO concertCity(cityname,nearestHotels) VALUES (?,?)");
        concertCity.forEach(({cityname,nearestHotels}, i) => {
            insertConcert.run([cityname,nearestHotels]);
        })
        insertConcert.finalize();

    });
    return db;
};

module.exports = { initDB };