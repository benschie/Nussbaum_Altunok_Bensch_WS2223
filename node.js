const express = require('express');
const cors = require('cors');
const package = require('./package.json');
const axios = require("axios")
const fs = require('fs');

const port = process.env.port || process.env.PORT || 1234;
const apiroot = '/api';

const app = express();


// https://api.seatgeek.com/2/events?aid=123



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin: /http:\/\/localhost/}));
app.options('*', cors());

const router = express.Router();


router.get('/events', (req,res) => {
    axios.get("https://api.seatgeek.com/2/events?aid=123").then(resultat => {
        res.json(resultat.data);
        // console.log(result.data)
    })
})


router.get('/hotels', (req,res) => {
    axios.get("https://developers.expediagroup.com/docs/static/content/api/assets/openapi/rapid-api.yaml?lang=en-US").then(resultat => {
        res.json(resultat.data);
    })
})

router.get('/', (req,res) => {
    res.send(`${package.description} - v${package.version}`);
});

/*
// GET /api/artist
// -> gibt zurück ein artist
router.get('/artist/:name', (req,res) => {

    if(!req.params.name){
        let rawdata = fs.readFileSync('./database.json');
        let artists = JSON.parse(rawdata);
            console.log(artists);
        res.status(400)
        .json(("gib mal ne name bitte"));
    }
    const name = req.params.name;
    let rawdata = fs.readFileSync('./database.json');
    let artists = JSON.parse(rawdata);
    
    console.log(artists);
});



// GET /api/artist
// -> gibt zurück alle kümstler im datenbank
router.get('/artist', (req,res) => {
    let rawdata = fs.readFileSync('./database.json');
    let artists = JSON.parse(rawdata);
    console.log(artists)
    res.status(200)
    .json(artists);
});
*/

app.use(apiroot, router);

app.listen(port, () => console.log("Simple server running on http://localhost:1234"));




 
	
/*

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


*/
