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

const bestellung = [
    {
        bestellung_id: 3456,
        kunde_id: 7655
    },
];


const kunde = [
    {
        kunde_id: 7655,
        name: "Borat"
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
        const insertOrt = db.prepare("INSERT INTO ort(cityname,nearestHotels) VALUES (?,?)");
        ort.forEach(({cityname,nearestHotels}, i) => {
            insertOrt.run([cityname,nearestHotels]);
        })
        insertOrt.finalize();


        db.run(`CREATE TABLE bestellung (
            bestellung_id INTEGER PRIMARY KEY,
            kunde_id INTEGER
        )`);
        const insertBestellung = db.prepare("INSERT INTO bestellung(bestellung_id,kunde_id) VALUES (?,?)");
        bestellung.forEach(({bestellung_id,kunde_id}, i) => {
            insertBestellung.run([bestellung_id,kunde_id]);
        })
        insertBestellung.finalize();
        

        db.run(`CREATE TABLE kunde (
            kunde_id INTEGER PRIMARY KEY,
            name TEXT
        )`);
        const insertKunde = db.prepare("INSERT INTO kunde(kunde_id,name) VALUES (?,?)");
        kunde.forEach(({kunde_id,name}, i) => {
            insertKunde.run([kunde_id,name]);
        })
        insertKunde.finalize();


    });
    return db;
};

module.exports = { initDB };