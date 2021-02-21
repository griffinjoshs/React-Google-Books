import { useState, useEffect } from 'react'
import API from '../utils/API'
import { Button, Row, Col } from "react-bootstrap";

const Saved = () => {
    const [savedBooks, setSavedBooks] = useState([])
    const [load, setLoad] = useState(0)

    useEffect(() => {
        API.getBooks().then(res => {
            console.log(res.data.results)
            setSavedBooks(res.data.results)
        }).catch(err => console.log(err))
    }, [load]);

    const deleteBook = (e, id) => {
        console.log(id)
        API.deleteBook(id)
        .then(res => {
            console.log(res.data.results)
            removeFromDom(id);
    })
        .catch(err => console.log(err))
        load === 1 ? setLoad(0) : setLoad(1)
    };

    const removeFromDom = (id) => {
        let result = savedBooks.filter(b => b._id === id)
        setSavedBooks(result)
    }

    return (
        <div>
            <h1>View Saved Books Here</h1>
            <a id='searchPage' href='/'>Search For More Books</a>
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
                  deleteBook(e, book._id
                    )}}>Delete</button>
                <p>{book.description}</p>
              </Col>
            </Row>
          ))}
        </div>
    )
}

export default Saved
