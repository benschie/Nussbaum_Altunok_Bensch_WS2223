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
            res.json({artistname: {}})
        } else {
            res.json({artistname: rows[0]})
        }
    })
});

app.post("/artist", (req, res) => {
    const { artist: { artistname, ortname} } = req.body;
    const insertStmt = "INSERT INTO artist(artistname,ortname) VALUES (?,?)";
    db.run(insertStmt, [artistname, ortname], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                id: this.lastID,
                artistname,
                ortname
            })
        }
    })
});


app.get("/ort", (req, res) => {
    db.all("SELECT * FROM ort", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({ort: rows})
        }
    });
});

app.get("/ort/:id", (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM ort where id is (?)", [id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({cityname: {}})
        } else {
            res.json({cityname: rows[0]})
        }
    })
});

app.post("/ort", (req, res) => {
    const { ort: { cityname,nearestHotels} } = req.body;
    const insertStmt = "INSERT INTO ort(cityname,nearestHotels) VALUES (?,?)";
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

app.get("/bestellung", (req, res) => {
    db.all("SELECT * FROM bestellung", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({bestellung: rows})
        }
    });
});

app.get("/bestellung/:id", (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM bestellung where bestellung_id is (?)", [bestellung_id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({bestellung: {}})
        } else {
            res.json({bestellung: rows[0]})
        }
    })
});

app.put("/bestellung", (req, res) => {
    const { bestellung: { bestellung_id,kunde_id} } = req.body;
    const insertStmt = "INSERT INTO bestellung(bestellung_id,kunde_id) VALUES (?,?)";
    db.run(insertStmt, [bestellung_id,kunde_id], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                bestellung_id: this.lastID,
                kunde_id
            })
        }
    })
});

app.get("/kunde", (req, res) => {
    db.all("SELECT * FROM kunde", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({kunde: rows})
        }
    });
});

app.get("/kunde/:id", (req, res) => {
    const { kunde_id } = req.params;
    db.all("SELECT * FROM artist where id is (?)", [kunde_id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({kunde: {}})
        } else {
            res.json({kunde: rows[0]})
        }
    })
});

app.post("/kunde", (req, res) => {
    const { kunde: {kunde_id,name} } = req.body;
    const insertStmt = "INSERT INTO kunde(kunde_id,name) VALUES (?,?)";
    db.run(insertStmt, [kunde_id,name], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                kunde_id: this.lastID,
                name
            })
        }
    })
});



// Ab hier ist noch ein Bug


app.get("/artist/:id/ticket", (req, res) => {
    db.all("SELECT * FROM ticket", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else {
            res.json({ticket: rows})
        }
    });
});



app.get("/artist/:id/ticket/:id", (req, res) => {
    const { ticket_id } = req.params;
    db.all("SELECT * FROM ticket where id is (?)", [ticket_id], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
        } else if (rows.length === 0) {
            res.json({ticket: {}})
        } else {
            res.json({ticket: rows[0]})
        }
    })
});

app.post("/artist/:id/ticket", (req, res) => {
    const { ticket: { ticket_id } } = req.body;
    const insertStmt = "INSERT INTO ticket(ticket_id) VALUES (?,?)";
    db.run(insertStmt, [ticket_id], function(err, result) {
        if (err) {
            res.status(500).json({ "error": err.message });
        } else {
            res.json({
                ticket_id
            })
        }
    })
});




app.listen(1234, () => console.log("Simple server running on http://localhost:1234"))