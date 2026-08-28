const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Serve the files in the public folder
app.use(express.static("public"));

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let date;

  // If no date is provided, use the current time
  if (!req.params.date) {
    date = new Date();
  } else {
    // Check if the parameter is a Unix timestamp
    if (/^\d+$/.test(req.params.date)) {
      date = new Date(Number(req.params.date));
    } else {
      date = new Date(req.params.date);
    }
  }

  // Check for invalid dates
  if (isNaN(date.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  // Return Unix timestamp and UTC date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});