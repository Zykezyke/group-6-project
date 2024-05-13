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
      <div style={{ display: "flex", alignItems: "center" }}>
        {editMode ? (
          <>
            <input type="text" value={newName} onChange={handleNameChange} />
            <button onClick={handleUpdateName}>Save</button>
          </>
        ) : (
          <>
            <h3>{name}</h3>
            <button onClick={() => setEditMode(true)}>Edit Name</button>
            <button onClick={toggleExpand}>
              {isExpanded ? "Hide Books" : "Show Books"}
            </button>
            <button className="delete-btn" onClick={deleteCollection}>Delete</button>
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
    </div>
  );
};

export default Collection;
