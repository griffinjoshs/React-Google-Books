const { Book } = require("../models/book");

module.exports = {
  allBooks: (req, res) => {
    Book.find({})
    .then(books => res.json({ message: 'success', results: books}))
    .catch(err => res.json({ message: 'error', results: err}));
  },
  newBook: (req, res) => {
    Book.create(req.body)
    .then(book => res.json({ message: 'success', results: book}))
    .catch(err => res.json({ message: 'error', results: err }));
  },
  deleteBook: (req, res) => {
    Book.findOneAndDelete({ _id: req.params.id })
    .then(book => res.json({ message: 'success', results: book}))
    .catch(err => res.json({ message: 'error', results: err}));
  }
}
