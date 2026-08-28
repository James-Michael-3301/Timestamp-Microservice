const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

// Enable CORS so freeCodeCamp can test the API
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use("/public", express.static(__dirname + "/public"));

// Homepage
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API
app.get("/api/:date?", function(req, res) {
  let date;

  // No date provided
  if (!req.params.date) {
    date = new Date();
  }

  // Unix timestamp
  else if (/^\d+$/.test(req.params.date)) {
    date = new Date(Number(req.params.date));
  }

  // Normal date string
  else {
    date = new Date(req.params.date);
  }

  // Invalid date
  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Valid date
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

module.exports = app;