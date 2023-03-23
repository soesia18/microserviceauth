const express = require('express');
const path = require('path');
const cors= require('cors');
const bodyParser = require('body-parser');

const DEFAULT_PORT = process.env.PORT || 8022;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

let tokens = ["test123"];

// Setup app folders.
app.use(express.static('app'));
app.use(cors({ origin: ['https://35.158.248.217', 'http://localhost:3000','http://localhost:80'
        ,'http://localhost:8090'
        ,'http://localhost:8091'
    ]
    , credentials: true }));


app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a route for index_ori.html
app.get('*', (req, res) => {
    if(tokens.includes(req.headers.authorization)) {
        res.send("Simon war auch hier");
    }
    else {
        res.status(417).send();
    }
});

//ToDo fix body() not a function 
//Login
app.post("/login", (req, res) => {
    req.body((data) => {
        console.log(data.username);
        console.log(data.password);
    });
    res.json({token: "test123", username: data.username, password: data.password});
});


// Start the server.
app.listen(port);
console.log(`Express listening on port ${port}...`);
