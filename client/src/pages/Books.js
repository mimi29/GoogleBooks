import React, { Component } from "react";
import axios from "axios";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import Jumbotron from "../components/Jumbotron";
import ResultMsg from "../components/ResultMsg";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
  };

  componentDidMount() {
    //this.loadBooks();
  }

  loadSearchBooks = (res) => {
    let bookList = [];
    for (var i = 0; i < res.length; i++) {
      let book = {};
      let bkAuthors = [];
      book._id = i;
      book.title = res[i].volumeInfo.title;
      book.description = res[i].volumeInfo.description;
      if (res[i].volumeInfo.authors === undefined) {
        bkAuthors.push("");
      }
      else {
        let len = res[i].volumeInfo.authors.length;
        for (var j = 0; j < len; j++) {
          bkAuthors.push(res[i].volumeInfo.authors[j]);
        }
      }
      if (res[i].volumeInfo.imageLinks === undefined) {
        book.image = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
      }
      else {
        book.image = res[i].volumeInfo.imageLinks.thumbnail;
      }
      book.authors = bkAuthors.toString();
      book.link = res[i].volumeInfo.infoLink;
      bookList.push(book);
    }
    this.setState({ books: bookList });
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  saveBook = id => {
    console.log("saveBook");
    API.saveBook({
      title: this.state.books[id].title,
      authors: this.state.books[id].authors,
      description: this.state.books[id].description,
      link: this.state.books[id].links,
      image: this.state.books[id].image
    })
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
    let bk = {};
    bk._id = this.state.books[id].id;
    bk.title = this.state.books[id].title;
    bk.description = this.state.books[id].description;
    bk.image = this.state.books[id].image;
    bk.link = this.state.books[id].links;
    console.log("title: "+bk.title);
    this.setState({
      title: bk.title,
    })
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      var title = this.state.title;
      console.log(title);
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title)
        .then(res => {
          var data = res.data.items;
          console.log(data);
          this.loadSearchBooks(data);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Search for and Save Books of Interest</h3>
            </Jumbotron>
            <form>
              <fieldset>
                <legend>Book Search</legend>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!this.state.title}
                  onClick={this.handleFormSubmit}
                >
                  Search
              </FormBtn>
              </fieldset>
            </form>
          </Col>
          </Row>
          <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Books Results</h1>
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
                        <ViewBtn onClick={() => this.viewBook(book._id)}/>
                        <SaveBtn onClick={() => this.saveBook(book._id)} />
                      </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
                <ResultMsg>
                  <h3>No Results to Display</h3>
                </ResultMsg>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Books;
