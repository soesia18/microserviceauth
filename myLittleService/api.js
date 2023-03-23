const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const DEFAULT_PORT = process.env.PORT || 8022;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

let tokens = ["max"];

// Setup app folders.
app.use(express.static('app'));
app.use(cors({
    origin: ['https://35.158.248.217', 'http://localhost:3000', 'http://localhost:80'
        , 'http://localhost:8090'
        , 'http://localhost:8091'
    ]
    , credentials: true
}));


app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({extended: true}));

// Set up a route for index_ori.html
app.get('*', (req, res) => {
    if (tokens.includes(req.headers.authorization)) {

        const API_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(API_ENDPOINT)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    } else {
        res.status(417).send();
    }
});


// Start the server.
app.listen(port);
console.log(`Express listening on port ${port}...`);
