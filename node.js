const axios = require("axios");

const encodedParams = new URLSearchParams();
encodedParams.append("apiKey", "<REQUIRED>");

const options = {
  method: 'POST',
  url: 'https://ticketmasterstefan-skliarovv1.p.rapidapi.com/searchEvents',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'cae9c614f0msh97670e10a5255f8p13a338jsn233109cac926',
    'X-RapidAPI-Host': 'Ticketmasterstefan-skliarovV1.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

const express = require("express");
const { url } = require("inspector");
const app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen(8080, function () {
    console.log("Server is running on localhost:8080");
});

