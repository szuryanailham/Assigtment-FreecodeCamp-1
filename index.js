// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// RECIEVE  PARAMETER FUNCTION
// PARAMETER SELECTION
// IF PARAMETER STRING (UTC TYPE)
// IF PRAMETER NUMBER (UNIX)
// SET RESPONSE UNIX & UTC

// http://localhost:3000/api/2015-12-25

app.get("/api/:timestamp?", (req, res) => {
  const param = req.params.timestamp;
  let date;

  if (!param) {
    // Kasus: tidak ada parameter, pakai waktu sekarang
    date = new Date();
  } else if (/^\d+$/.test(param)) {
    // Kasus: param hanya angka, artinya UNIX timestamp
    date = new Date(parseInt(param));
  } else {
    // Kasus: param string format UTC (ex: 2015-12-25)
    date = new Date(param);
  }

  // Cek apakah date valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // return response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
