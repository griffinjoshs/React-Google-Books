const TestController = require("../controllers/test.controller");
const BooksController = require("../controllers/booksController");

module.exports = function (app) {
  app.get("/api", TestController.index);
  app.get("/api/books", BooksController.allBooks);
  app.post("/api/books", BooksController.newBook);
  app.delete("/api/books/:id", BooksController.deleteBook);
};
