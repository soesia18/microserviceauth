const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const DEFAULT_PORT = process.env.PORT || 8022;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

const secretKey = 'maier-secret-key'
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
app.get('*', (req, res) =>  {
    const token = req.headers.authorization;
    if (!token) {
        console.log('header');
        return res.status(401).send('Unauthorized');
    }

    try {
        // Verify the JWT using the secret key
        const payload = jwt.verify(token, secretKey);

        const API_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(API_ENDPOINT)
            .then(async response => {
                let data = await response.json();
                res.send(data);
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    } catch (err) {
        console.log(err);
        return res.status(401).send('Unauthorized');
    }   
});

//Login
app.post("/login", (req, res) => {
    if(req.body.token == 'sTR8GquNAFToDuboNuwaXgYaibrUBvjwJJ3dtXBqrjqnOyqTrj8EsRLRsumQUgfmzbEnNZmI769zvNvImKWjjCdwQlq3LgNHNR4rhxg9lnTR9rthnBtxa0rLbqkn3rcR') {
        const token = jwt.sign(req.body.token, secretKey);
        res.json(token);
    }
});

// Start the server.
app.listen(port);
console.log(`Express listening on port ${port}...`);
