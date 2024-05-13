import React from "react";
import BookCard from "./BookCard";

const Favorites = ({
  favorites,
  toggleFavorite,
  saveCurrentPage,
  currentPageByTitle,
  collections,
  addToCollection,
}) => {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="list">
        {favorites.map((book, i) => (
          <div key={i} className="book-wrapper">
            <BookCard
              image={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors}
              published={book.volumeInfo.publishedDate}
              pages={book.volumeInfo.pageCount}
              description={book.volumeInfo.description}
              genre={book.volumeInfo.categories}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
              currentPage={currentPageByTitle[book.volumeInfo.title] || 1}
              saveCurrentPage={saveCurrentPage}
              collections={collections}
              addToCollection={(index) => addToCollection(index, book)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
