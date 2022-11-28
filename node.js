const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./db');

const app = express();
app.use(bodyParser.json());

const db = initDB();

app.get("/artist", (req, res) => {
    db.all("SELECT * FROM artist", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({artist: rows})
        }
    });
});

app.get("/artist/:id", (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM artist where id is (?)", [id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({user: {}})
        } else {
            res.json({user: rows[0]})
        }
    })
});

app.post("/artist", (req, res) => {
    const { artist: { artistname, concertCity} } = req.body;
    const insertStmt = "INSERT INTO artist(artistname,concertCity) VALUES (?,?)";
    db.run(insertStmt, [artistname, concertCity], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                id: this.lastID,
                artistname,
                concertCity
            })
        }
    })
});


app.get("/concertCity", (req, res) => {
    db.all("SELECT * FROM concertCity", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({concertCity: rows})
        }
    });
});

app.get("/concertCity/:id", (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM concertCity where id is (?)", [id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({user: {}})
        } else {
            res.json({user: rows[0]})
        }
    })
});

app.post("/concertCity", (req, res) => {
    const { concertCity: { cityname,nearestHotels} } = req.body;
    const insertStmt = "INSERT INTO concertCity(cityname,nearestHotels) VALUES (?,?)";
    db.run(insertStmt, [cityname,nearestHotels], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                id: this.lastID,
                cityname,
                nearestHotels
            })
        }
    })
});

app.listen(1234, () => console.log("Simple server running on http://localhost:1234"))