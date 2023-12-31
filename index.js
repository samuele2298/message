const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inizializza l'SDK Admin con le credenziali del tuo progetto Firebase
var serviceAccount = require('./firebaseKeys.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(bodyParser.json());

app.post('/sendMessage', (req, res) => {
    const { tokenDestinazione, tokenMittente, messaggio } = req.body;

    // Crea un messaggio
    var message = {
        notification: {
            title: messaggio,
            body: 'Da Amore',
        },
        token: tokenDestinazione
    };

    // Invia il messaggio
    admin.messaging().send(message)
        .then((response) => {
            console.log('Messaggio inviato con successo:', response);
            res.status(200).send('Messaggio inviato con successo');
        })
        .catch((error) => {
            console.log('Errore durante l\'invio del messaggio:', error);
            res.status(500).send('Errore durante l\'invio del messaggio');
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server in ascolto sulla porta ${port}`));
