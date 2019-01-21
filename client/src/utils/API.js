import axios from "axios";

export default {

  getBooks: function() {
    console.log("getBooks");
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    console.log("getBook: "+id);
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    console.log("deleteBook");
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log("saveBook");
    return axios.post("/api/books", bookData);
  },

  detailBook: function(id) {
    console.log("show detail");
    return axios.get("/bool/detail/"+id);
  },
};
