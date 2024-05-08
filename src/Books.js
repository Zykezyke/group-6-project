import React, { Component } from "react";
import SearchArea from "./SearchArea";
import request from "superagent";
import "./App.css";
import Library from "./Library";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      favorites: [],
      searchField: "",
      sort: "",
    };
  }

  searchBook = (e) => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField })
      .then((data) => {
        console.log(data);
        const cleanData = this.cleanData(data);
        this.setState({ books: cleanData });
      });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({ searchField: e.target.value });
  };

  handleSort = (e) => {
    console.log(e.target.value);
    this.setState({ sort: e.target.value });
  };

  cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      } else if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = { thumbnail: "" };
      } else if (book.volumeInfo.hasOwnProperty("authors")) {
        book.volumeInfo.authors = book.volumeInfo.authors.join(", ");
      }

      return book;
    });

    return cleanedData;
  };

  toggleFavorite = (title) => {
    const { books, favorites } = this.state;
    const bookIndex = books.findIndex(
      (book) => book.volumeInfo.title === title
    );
    const favoriteIndex = favorites.findIndex(
      (fav) => fav.volumeInfo.title === title
    );

    if (favoriteIndex !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(favoriteIndex, 1);
      this.setState({ favorites: updatedFavorites });
    } else {
      const updatedFavorites = [...favorites, books[bookIndex]];
      this.setState({ favorites: updatedFavorites });
    }
  };

  render() {
    const { books, favorites, sort } = this.state;

    const sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest") {
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
      } else if (this.state.sort === "Oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
      }
    });
    return (
      <div>
        <SearchArea
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
        />
        <Library
          books={sortedBooks}
          toggleFavorite={this.toggleFavorite}
          favorites={favorites}
        />
      </div>
    );
  }
}
export default Books;
