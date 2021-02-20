import { useState, useEffect } from 'react'
import API from '../utils/API'
import { Button, Row, Col } from "react-bootstrap";

const Saved = () => {
    const [savedBooks, setSavedBooks] = useState([])
    useEffect(() => {
        API.getBooks().then(res => {
            console.log(res.data.results)
            setSavedBooks(res.data.results)
        }).catch(err => console.log(err))
    }, []);

    const deleteBook = (e, obj) => {
        console.log(obj)
        API.deleteBook(obj)
        .then(res => {
            console.log(res.data.results)
    })
        .catch(err => console.log(err))
    };

    return (
        <div>
            <h1>View Saved Books Here</h1>
            {savedBooks.map((book, i) => (
            <Row key={i} className="border p-3">
              <Col sm={4}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>

                <br></br>
                <img src={book.image} alt=""></img>
              </Col>
              <Col sm={8}>
              <a className='btn btn-secondary' href={book.link}>View</a>
              <button className='btn-danger' onClick={e => {
                  deleteBook(e, book
                    )}}>Delete</button>
                <p>{book.description}</p>
                
              </Col>
            </Row>
          ))}
        </div>
    )
}

export default Saved
