const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Erstellt eine neue Express-App
const app = express();

// Aktiviert CORS, damit der Server Anfragen von anderen Domains akzeptiert
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());

// Erstellt eine Route, die auf '/events' reagiert
app.get('/events', (req, res) => {
  // Holt den Wert der query-Parameter 'city' aus der Anfrage
  const city = req.query.city;

  // Wenn 'city' nicht vorhanden ist, gib den HTML-Code zurück, der das Eingabefeld für den Benutzer anzeigt
  if (!city) {

    // Einfaches HTML Script, damit der Benutzer etwas auf der Seite sehen kann
    return res.send(`
      <h1>Events</h1>
      <h5>Gloria, East Lansing, Hamden, Ann Arbor, Tuscaloosa, Madison, Iowa City, Las Vegas, Detroit oder New York eingeben</h5>
      <form action="/events" method="GET">
        <label for="city">Stadt:</label>
        <input type="text" name="city" id="city" required>
        <button type="submit">Events anzeigen</button>
      </form>
      <div id="events-container"></div>
    `);
  }

  // Ansonsten mache eine API-Anfrage an die SeatGeek API und holt alle Events für die angegebene Stadt
  axios
  .get(`https://api.seatgeek.com/2/events?aid=123&venue.city=${city}`)
  .then((response) => {
    // Überprüft, ob es Events in der angegebenen Stadt gibt
    if (response.data.events.length === 0) {
      // Wenn es keine Events gibt, dann sende eine Nachricht zurück an den Benutzer, dass keine Events in der Stadt gefunden wurden
      return res.send(`
        <h1>Es gibt keine anstehenden Events in ${city}. Bitte geben Sie eine andere Stadt ein.</h1>
        <h5>Gloria, East Lansing, Hamden, Ann Arbor, Tuscaloosa, Madison, Iowa City, Las Vegas, Detroit oder New York eingeben</h5>
        <form action="/events" method="GET">
          <label for="city">Stadt:</label>
          <input type="text" name="city" id="city" required>
          <button type="submit">Events anzeigen</button>
        </form>
      `);
    }
    // Wenn es Events in der Stadt gibt, dann sende die Informationen der Events zurück an den Benutzer
    res.send(`
    <h1>Events in ${city}</h1>
    ${response.data.events
      .map((event) => {
        // Geht jedes Event in der API-Antwort durch
        // und erstellt ein HTML-Blockelement für jedes Event
        return `
        <details>
          <summary>
            <h2>${event.title}</h2>
        </summary>
        <p>Veranstaltungsort: ${event.venue.name}</p>
        <p>Adresse: ${event.venue.address} ${event.venue.extended_address}</p>
        <p>Datum: ${new Date(event.datetime_local).toLocaleDateString('de-DE')}</p>
        <button onclick="getNearestHotel('${event.venue.location.lat},${event.venue.location.lon}', '${event.id}')">Nächstes Hotel anzeigen</button>
        <div id="hotel-info-${event.id}"></div>
        </details>
            `;
          })
          // Fügt alle HTML-Elemente aus dem Array, das von der map()-Methode zurückgegeben wurde, 
          // zu einem einzigen String zusammen. Die leere Zeichenkette wird als Separator verwendet, 
          // sodass kein Separator zwischen den Elementen hinzugefügt wird. Das Ergebnis wird dann an den Browser gesendet (res.send()).
          .join('')}
      `);
    });
});

// Startet den Server und gibt eine Meldung auf der Konsole aus, sobald der Server gestartet wurde
const port = process.env.port || process.env.PORT || 1234;

app.listen(port, () => console.log('Simple server running on http://localhost:1234'));