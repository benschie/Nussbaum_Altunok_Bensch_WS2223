const express = require('express');
const cors = require('cors');
const package = require('./package.json');
const axios = require("axios")
const fs = require('fs');

const port = process.env.port || process.env.PORT || 1234;
const apiroot = '';

const app = express();


// https://api.seatgeek.com/2/events?aid=123


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin: /http:\/\/localhost/}));
app.options('*', cors());

const router = express.Router();


// Rapid-Api-Key (Hotels): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzA0MjY1MDksImlhdCI6MTY3MDQyNDcwOSwibmJmIjoxNjcwNDI0NzA5LCJpZGVudGl0eSI6MTY3OX0.NFhaE1qV1xmiU7IqPHYWCgTFE9tlaWW-gmraU6RlCIY


router.get('/events', (req,res) => {
    axios.get("https://api.seatgeek.com/2/events?aid=123").then(resultat => {
        res.json(resultat.data);
    })
})


// Noch keinen geeigneten API-Link für "Hotels" gefunden, aktueller Link ist in .yaml statt .json

router.get('/hotels', (req,res) => {
    axios.get("https://developers.expediagroup.com/docs/static/content/api/assets/openapi/rapid-api.yaml?lang=en-US").then(resultat => {
        res.json(resultat.data);
    })     
})


app.use(apiroot, router);

app.listen(port, () => console.log("Simple server running on http://localhost:1234"));

