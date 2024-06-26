import React, { useState, useEffect } from "react";
import BookInCollection from "./BookInCollection";

const Collection = ({
  name,
  books,
  deleteBook,
  updateName,
  saveCurrentPage,
  currentPageByTitle,
  deleteCollection,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdateName = () => {
    updateName(newName);
    setEditMode(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <div>
      <div className="collection-item">
        {editMode ? (
          <>
            <input type="text" value={newName} onChange={handleNameChange} />
            <button onClick={handleUpdateName}>Save</button>
          </>
        ) : (
          <>
            <h3>{name}</h3>
            <div className="button-group">
              <button onClick={() => setEditMode(true)}>Edit Name</button>
              <button onClick={toggleExpand}>
                {isExpanded ? "Hide Books" : "Show Books"}
              </button>
              <button onClick={deleteCollection}>Delete</button>
            </div>
          </>
        )}
      </div>

      {isExpanded && (
        <div className="list">
          {books.map((book, index) => (
            <div key={index} className="book-wrapper">
              <BookInCollection
                image={book.imageLinks.thumbnail}
                title={book.title}
                author={book.authors}
                published={book.publishedDate}
                pages={book.pageCount}
                deleteBook={deleteBook}
                currentPage={currentPageByTitle[book.title] || 1}
                saveCurrentPage={saveCurrentPage}
              />
            </div>
          ))}
        </div>
      )}
      <center>
        <hr></hr>
      </center>
    </div>
  );
};

export default Collection;
