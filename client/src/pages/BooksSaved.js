import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import Jumbotron from "../components/Jumbotron";
import ResultMsg from "../components/ResultMsg";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class BooksSaved extends Component {
  state = {
    books: [],
    title: "",
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", description: "", link: "", image: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => {
        let array = this.state.books;
        if (id !== -1) {  // delete the book has been saved to DB
          array.splice(id, 1);
          this.setState({ books: array });
        }
      })
      .catch(err => console.log(err));
  };

  viewBook = id => {
    console.log("viewBook");
    API.detailBook(id)
      .then(res =>console.log(res))
      .catch(err =>console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <Container fluid>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h3>Search for and Save Books of Interest</h3>
          </Jumbotron>
          {this.state.books.length ? (
            <List>
              {this.state.books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title}
                    </strong>
                  </Link>
                  <div>
                    <strong>Written By </strong>{book.authors}
                  </div>
                  <Row>
                    <Col size="md-2">
                      <img src={book.image} alt="book" className="brand-logo" />
                    </Col>
                    <Col size="md-10">
                      {book.description}
                    </Col>
                  </Row>
                  <Row>
                    <Col size="md-12">
                      <ViewBtn onClick={() => this.viewBook(book._id)} />
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </Col>
                  </Row>
                </ListItem>
              ))}
            </List>
          ) : (
              <ResultMsg>
                <h3>There are no saved books</h3>
              </ResultMsg>
            )}
        </Col>
      </Container>
    );
  }
};

export default BooksSaved;
