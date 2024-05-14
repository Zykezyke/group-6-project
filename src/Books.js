import React, { Component } from "react";
import SearchArea from "./SearchArea";
import request from "superagent";
import "./App.css";
import Library from "./Library";
import backgroundImage from "./images/background-image.png";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      favorites: [],
      collections: [],
      searchField: "",
      sort: "",
      currentPageByTitle: {}, // Move currentPageByTitle to Books component
    };
  }

  searchBook = (e) => {
    e.preventDefault();
    const maxResults = 40;
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField, maxResults })
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
      } else if (book.volumeInfo.hasOwnProperty("categories")) {
        book.volumeInfo.categories = book.volumeInfo.categories.join(", ");
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

  saveCurrentPage = (title, page) => {
    this.setState((prevState) => ({
      currentPageByTitle: {
        ...prevState.currentPageByTitle,
        [title]: page,
      },
    }));
  };

  render() {
    const { books, favorites, sort, collections, currentPageByTitle } =
      this.state;

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

        <div className="image-content">
          <img src={backgroundImage} />
          <h4>Find Your Book of Choice</h4>
          <p>
            Explore a wide range of genres and discover your next favorite read.
          </p>
          <form onSubmit={this.searchBook} action="" className="search-form">
            <div className="search-input">
              {" "}
              <input
                onChange={this.handleSearch}
                type="text"
                required
                placeholder="Search..."
              />
            </div>
          </form>
        </div>

        <Library
          books={sortedBooks}
          toggleFavorite={this.toggleFavorite}
          favorites={favorites}
          collections={collections}
          saveCurrentPage={this.saveCurrentPage}
          currentPageByTitle={currentPageByTitle}
        />
      </div>
    );
  }
}
export default Books;
