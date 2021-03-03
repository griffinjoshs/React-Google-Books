const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.port || 8000;
const mongooose = require("mongoose");
require("dotenv").config({path: './config.env'})


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

const connectionString = process.env.DB_CONNECTION.replace('<password>', process.env.DB_PASSWORD).replace('<dbname>', process.env.DB_NAME)
mongooose
// .connect("mongodb://localhost/booksDb", {
  .connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    seUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("established connection to database");
  })
  .catch((error) => {
    console.log("were fucked", error);
  });

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`));
