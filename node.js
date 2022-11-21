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

app.post("/artists", (req, res) => {
    const { artist: { artistname, city} } = req.body;
    const insertStmt = "INSERT INTO artist(artistname,city) VALUES (?,?)";
    db.run(insertStmt, [artistname, city], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                id: this.lastID,
                artistname,
                city
            })
        }
    })
});

app.listen(1234, () => console.log("Simple server running on http://localhost:1234"))