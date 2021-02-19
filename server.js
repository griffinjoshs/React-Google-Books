const express = require('express')
const app = express();
const cors = require('cors')
const port = 8000;

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// 
require('./server/config/mongoose.config');

// Define API routes here
require('./server/routes/test.routes')(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`));
