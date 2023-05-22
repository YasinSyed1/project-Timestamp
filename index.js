// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Date object
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

// we will display the date as DD-MM-YYYY 

let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
var timestamp = new Date().getTime();
//console.log(timestamp)

app.get("/api", (req, res) => {
  var timestamp = new Date().getTime();
  let date = new Date().toUTCString();
  res.json({unix: timestamp, utc: date })
});

app.get("/api/:date", (req, res) => {
  const date_in_endpoint = req.params.date;
  // console.log(date_in_endpoint)
  // console.log(parseInt(date_in_endpoint));


  
  const date = parseInt(date_in_endpoint) < 999999 ? new Date(date_in_endpoint):new Date(parseInt(date_in_endpoint));
  console.log(date)
  date.toString() === "Invalid Date"? res.json({ error: "Invalid Date" }) : res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
