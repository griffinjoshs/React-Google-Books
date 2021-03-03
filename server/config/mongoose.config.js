const mongooose = require("mongoose");

mongooose
  .connect("mongodb://localhost/booksDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("established connection to database");
  })
  .catch((error) => {
    console.log("were fucked", error);
  });