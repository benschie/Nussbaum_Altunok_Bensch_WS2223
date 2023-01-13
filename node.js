const { JSDOM } = require("jsdom");
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = require('jquery')(window);
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Erstellt eine neue Express-App
const app = express();

// Aktiviert CORS, damit der Server Anfragen von anderen Domains akzeptiert
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());


/*
console.log(function toHexString(data) {
    return data.map(function(hex) {
        return (hex & 0xFF).toString(16)
    }).join('')
    })
*/


// Funktion, die die Hotelliste von der API abruft


async function showHotels(city) {
    return new Promise((resolve, reject) => {
        axios.get('https://engine.hotellook.com/api/v2/lookup.json?query=${city}', {
            headers: {
                'Authorization': 'Token b9e9b6cb790306adc2b52d0b08bc2358'
            }
        })
            .then(response => {
                const data = response.data;
                const dataAsString = Buffer.from(data, 'binary').toString();

                console.log(dataAsString);

                console.log(data)

                const hotels = data?.results?.hotels;
                const showHotelButton = document.getElementById("show-hotel-button");
                const hotelInfoDiv = document.getElementById("hotel-info");
        
                let hotelIndex = 0;
        
                showHotelButton?.addEventListener("click", () => {
                    const currentHotel = hotels[hotelIndex];
                    hotelInfoDiv.innerHTML = `
                    <p>Hotel Name: ${currentHotel.name}</p>
                    <p>Preis: ${currentHotel.price}</p>
                    <p>Stadt: ${currentHotel.city}</p>
                    `;
                    hotelIndex = (hotelIndex + 1) % hotels.length;
                });
            })
            .catch(error => {
                console.log(error);
            })

        })
        .catch(error => {
            reject(error);
        });
};





// Klick-Handler für den "Nächstes Hotel anzeigen"-Button
$("#show-hotel-button").click(showHotels);


async function getAvailableCities() {

    try {

      // Sendet eine Anfrage an die API, um die Liste der verfügbaren Städte abzurufen
      const response = await axios.get('https://api.seatgeek.com/2/venues?aid=123');
  
      // Extrahiert die Namen der Städte aus der API-Antwort
      const cityNames = response.data.venues.map((venue) => venue.city);
  
      // Gibt die Liste der Städtenamen zurück
      return cityNames;
    } catch (error) {
      console.error(error);
    }
}


app.get('/events', (req, res) => {
    // Holt den Wert der query-Parameter 'city' aus der Anfrage
    const city = req.query.city;
  
    // Wenn 'city' nicht vorhanden ist, gib den HTML-Code zurück, der das Eingabefeld für den Benutzer anzeigt
    if (!city) {
        // Lädt die Liste der verfügbaren Städte aus der API
        getAvailableCities().then((availableCities) => {
            // Wenn die Liste der verfügbaren Städte erfolgreich geladen wurde,
            // generiere HTML-Code mit der Liste der Städte und sende ihn zurück an den Benutzer
            return res.send(`
              <h1>Events</h1>
              <h5>Bitte wähle eine Stadt aus der Liste aus:</h5>
              <form action="/events" method="GET">
                <label for="city">Stadt:</label>
                <select name="city" id="city" required>
                  ${availableCities.map((city) => `<option value="${city}">${city}</option>`)}
                </select>
                <button type="submit">Events suchen</button>
              </form>
            `);
        });
    } else {
        // Sendet eine Anfrage an die SeatGeek API, um die Liste der Events für die angegebene Stadt abzurufen
        axios.get(`https://api.seatgeek.com/2/events?venue.city=${city}&aid=123`)
            .then((response) => {
                // Extrahiert die benötigten Daten aus der API-Antwort
                const events = response.data.events;

                const dropDownCity = $("#city").val();
                // Wenn es Events gibt, generiere HTML-Code mit der Liste der Events und sende ihn zurück an den Benutzer
                if (events.length > 0) {
                    return res.send(`
                    <script language="JavaScript1.2" src="Nussbaum_Altunok_Bensch_WS2223/node.js" charset="UTF-8"> </script>
                        <h1>Events in ${city}</h1>
                        ${events.map((event) => `
                            <details>
                              <summary>
                                <h2>${event.title}</h2>
                              </summary>
                              <p>Veranstaltungsort: ${event.venue.name}</p>
                              <p>Adresse: ${event.venue.address} ${event.venue.extended_address}</p>
                              <p>Datum: ${new Date(event.datetime_local).toLocaleDateString()}</p>
                              <p>Beginn: ${new Date(event.datetime_local).toLocaleTimeString()}</p>
                              <p>Preis: ${event.stats.average_price ? `$${event.stats.average_price}` : 'Kostenlos'}</p>
                              <a href="${event.url}" target="_blank">Weitere Informationen</a>
                              <button id="show-hotel-button" onclick="${showHotels(city)}">Nächstes Hotel anzeigen</button>
                              <div id="hotel-info"></div>
                            </details>
                        `
                    )})
                .join('')}
                `);
            }
        });
    }
});




  
// Startet den Server und gibt eine Meldung auf der Konsole aus, sobald der Server gestartet wurde
const port = process.env.port || process.env.PORT || 1234;

app.listen(port, () => console.log('Simple server running on http://localhost:1234'));

