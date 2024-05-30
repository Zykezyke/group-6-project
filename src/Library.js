import React, { useState } from "react";
import BookCard from "./BookCard";
import Favorites from "./Favorites";
import Collection from "./Collection";

const Library = ({ books, toggleFavorite, favorites }) => {
  const [currentPageByTitle, setCurrentPageByTitle] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const saveCurrentPage = (title, page) => {
    setCurrentPageByTitle({ ...currentPageByTitle, [title]: page });
  };

  const createCollection = () => {
    if (
      collections.some((collection) => collection.name === newCollectionName)
    ) {
      alert(
        "A collection with the same name already exists. Please choose a different name."
      );
      return;
    } else if (!newCollectionName) {
      alert("Please enter a name for your collection.");
      return;
    }

    setCollections([...collections, { name: newCollectionName, books: [] }]);
    setNewCollectionName("");
  };

  const deleteCollection = (index) => {
    const updatedCollections = [...collections];
    updatedCollections.splice(index, 1);
    setCollections(updatedCollections);
  };

  const addToCollection = (index, book) => {
    if (index !== "") {
      const collection = collections[index];
      if (!collection.books.some((b) => b.title === book.volumeInfo.title)) {
        const updatedCollections = [...collections];
        updatedCollections[index].books.push(book.volumeInfo);
        setCollections(updatedCollections);
        setCurrentPageByTitle({
          ...currentPageByTitle,
          [book.volumeInfo.title]: book.currentPage || 1,
        });
        window.alert(
          `"${book.volumeInfo.title}" has been added to the "${collection.name}" collection.`
        );
      } else {
        window.alert(
          `"${book.volumeInfo.title}" is already in the "${collection.name}" collection.`
        );
      }
    }
  };

  const deleteBookFromCollection = (collectionIndex, book) => {
    const updatedCollections = [...collections];
    const updatedBooks = updatedCollections[collectionIndex].books.filter(
      (b) => b.title !== book.title
    );
    updatedCollections[collectionIndex].books = updatedBooks;
    setCollections(updatedCollections);
  };

  const updateCollectionName = (index, newName) => {
    if (
      collections.some(
        (collection, i) => i !== index && collection.name === newName
      )
    ) {
      alert(
        "A collection with the same name already exists. Please choose a different name."
      );
      return;
    } else if (!newName) {
      alert("Please enter a name for your collection.");
      return;
    }

    const updatedCollections = [...collections];
    updatedCollections[index].name = newName;
    setCollections(updatedCollections);
  };

  const handleNewCollectionNameChange = (e) => {
    setNewCollectionName(e.target.value);
  };

  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="container">
        <hr></hr>
        <div className="create-col">
          <h2>Create your collection</h2>
          <input
            className="collect-input"
            type="text"
            value={newCollectionName}
            onChange={handleNewCollectionNameChange}
          />
          <button onClick={createCollection}>Create Collection</button>
        </div>
      </div>
      <div>
        {collections.map((collection, index) => (
          <div key={index}>
            <Collection
              name={collection.name}
              books={collection.books}
              deleteBook={(book) => deleteBookFromCollection(index, book)}
              updateName={(newName) => updateCollectionName(index, newName)}
              saveCurrentPage={saveCurrentPage}
              currentPageByTitle={currentPageByTitle}
              deleteCollection={() => deleteCollection(index)}
            />
          </div>
        ))}
      </div>
      <div className="list">
        {books
          .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
          .map((book, i) => {
            return (
              <div key={i} className="book-wrapper">
                <BookCard
                  image={book.volumeInfo.imageLinks?.thumbnail}
                  title={book.volumeInfo.title}
                  author={book.volumeInfo.authors}
                  published={book.volumeInfo.publishedDate}
                  pages={book.volumeInfo.pageCount}
                  description={book.volumeInfo.description}
                  genre={book.volumeInfo.categories}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.some(
                    (fav) => fav.volumeInfo.title === book.volumeInfo.title
                  )}
                  currentPage={currentPageByTitle[book.volumeInfo.title] || 1}
                  saveCurrentPage={saveCurrentPage}
                  collections={collections}
                  addToCollection={(index) => addToCollection(index, book)}
                />
              </div>
            );
          })}
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {showFavorites && (
        <div className="container">
          <hr></hr>
          <Favorites
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            saveCurrentPage={saveCurrentPage}
            currentPageByTitle={currentPageByTitle}
            collections={collections}
            addToCollection={addToCollection}
          />
        </div>
      )}
      <center>
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? "Hide Favorites" : "Show Favorites"}
        </button>
      </center>
    </div>
  );
};

export default Library;
