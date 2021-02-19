// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import API from '../utils/API'
  import Book from '../components/book'


const Search = () => {
  const [search, SetSearch] = useState('');
  const [books, setBooks] = useState([]);

  const submitHandler = () => {
    API.searchBooks(search)
    .then(res => {
      console.log(res.data)
      console.log(res.data.items[0].volumeInfo.title);
      console.log(res.data.items[0].volumeInfo.authors[0]);
      // console.log(res.data.items[0].volumeInfo.description);
      console.log(res.data.items[0].volumeInfo.infoLink);
      console.log(res.data.items[0].volumeInfo.imageLinks.thumbnail);
      setBooks(res.data.items);
    })
    .catch(err => console.log(err))
  };

  return (
    <div>
      <h1>Search Books!</h1>
      <Form>
      <Form.Group>
        <Form.Control
        type='search'
        placeholder='Search'
        name='search'
        onChange={(e) => SetSearch(e.target.value)}
        value={search}
        >
        </Form.Control>
        <Button variant='primary' onClick={submitHandler}>Search</Button>
        {books.map((book, i) => (
          <Row key={i} className='border p-3'>
            <Col sm={4}>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt=''></img>
            </Col>
          <Col sm={8}>
        <h3>{book.volumeInfo.title}</h3>
        <p>{book.volumeInfo.authors?.join(', ')}</p>
        <p>{book.volumeInfo.description}</p>
        <a href={book.volumeInfo.infoLink}>More Info</a>
          </Col>
          </Row>
        ))}
      </Form.Group>
      </Form>
    </div>
  )
}

export default Search
