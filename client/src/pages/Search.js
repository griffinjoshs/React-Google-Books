// import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import API from "../utils/API";
import Book from "../components/book";
import '../styles/Search.css'

const Search = () => {
  const [search, SetSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    title: '',
    authors: '',
    description: '',
    link: '',
    image: ''
  })

  const submitHandler = () => {
    API.searchBooks(search)
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.items[0].volumeInfo.title);
        // console.log(res.data.items[0].volumeInfo.authors[0]);
        // console.log(res.data.items[0].volumeInfo.description);
        // console.log(res.data.items[0].volumeInfo.infoLink);
        // console.log(res.data.items[0].volumeInfo.imageLinks.thumbnail);
        console.log(res.data.items[0].id)
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
      setBook({
        title: '',
        authors: '',
        description: '',
        link: '',
        image: ''
      })
  };

  const saveBook = (e, obj) => {
    e.preventDefault()
    // before saving book to database:
    book.title = obj.volumeInfo.title
    book.authors = obj.volumeInfo.authors?.join(', ')
    book.description = obj.volumeInfo.description
    book.link = obj.volumeInfo.infoLink
    book.image = obj.volumeInfo.imageLinks?.thumbnail
    API.saveBook(book).then(res => {
      console.log(res.data.message)
      console.log(res.data.results)
    })
    .catch(err => console.log(err))
    console.log(book)

}

  return (
    <div>
      <h1 className='text-center'>Search For A Book!</h1>
      <br></br>
      <a id='savedPage' href='/saved'>Saved Books</a>
      <br></br>
      <br></br>
      <Form className='form'>
        <Form.Group>
          <div id='inputSec'>
          <Form.Control
            type="search"
            placeholder="Search"
            name="search"
            id='search'
            onChange={(e) => SetSearch(e.target.value)}
            value={search}
          ></Form.Control>
          <Button variant="primary" onClick={submitHandler}>
            Search
          </Button>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {books.map((book, i) => (
            <Row key={i} className="border p-3">
              <Col sm={4}>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(", ")}</p>

                <br></br>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt=""></img>
              </Col>
              <Col sm={8}>
              <a className='btn btn-secondary' href={book.volumeInfo.infoLink}>View</a>

                <button variant="primary ml-3" className='button' onClick={(e) => {saveBook(e, book)}}>
                  Save
                </button>
                <p>{book.volumeInfo.description}</p>
              </Col>
            </Row>
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;
