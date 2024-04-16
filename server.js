// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

//spin up the server
const server = app.listen(port, listening);

//callback
function listening(){
    console.log(`Server Successfully running on Localhost: ${port}`);
}


// GET route
app.get('/all', getData);
//callback function
function getData(req, res) {
    res.send(projectData);
    console.log('Sent/got data:', projectData);
}

// POST route
//TODO: create post() url path and callback function
app.post('/addingData', addData);
//callback function
function addData(req, res) {
   //TODO: extract data from the request body and store it in variable
   let data = req.body;
   console.log('Received/Added data:', data);
   // TODO:  update the projectData object with the received data, associating each value with a specific key.
   projectData = {
    temperature: data.temperature,
    date: data.date,
    userFeelings: data.userFeelings,
    weatherMain: data.weatherMain,
    weatherDescription: data.weatherDescription,
    weatherIcon: data.weatherIcon
   };
   //TODO: Send a JSON response with a success message
   res.status(200).json({ message: 'Data added successfully!' }); // Marker: I get help from https://stackoverflow.com/questions/26066785/proper-way-to-set-response-status-and-json-content-in-a-rest-api-made-with-nodej
}