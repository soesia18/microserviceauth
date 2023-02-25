const express = require('express');
const path = require('path');
const cors= require('cors');
const bodyParser = require('body-parser');

const DEFAULT_PORT = process.env.PORT || 8091;

// initialize express.
const app = express();

// Initialize variables.
let port = DEFAULT_PORT;

// Configure morgan module to log all requests.

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
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/access', function (req, res) {
    const access = req.body;

   // console.log("post access body=", JSON.stringify(access) );
    console.log("post access body=", access);
    if (access.endsWith("@htl-kaindorf.at")){
        console.log("*********************XXXX success" );

        const access_service = {
            "services": [ {"name": "service1"}, {"name": "service2"}],
            "service_token": "ich_bin_ein_service_token"
        }

        console.log("*********************XXXX success" );
        //res.status(200).send(JSON.stringify(access_service));
        res.send("success");
        return;
    }
    console.log("*********************XXXX Access forbidden" );
    res.status(403).send("Access forbidden");
});

// Start the server.
app.listen(port);
console.log(`Express listening on port ${port}...`);
