import React, { useState, useEffect } from "react";

const BookCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    if (page > props.pages) {
      alert("Current page cannot be greater than total pages.");
      return;
    }
    setCurrentPage(page);
    props.saveCurrentPage(props.title, page);
  };

  useEffect(() => {
    setCurrentPage(props.currentPage || 1);
  }, [props.currentPage]);

  return (
    <div className="card-container">
      {props.image ? (
        <img src={props.image} alt="" />
      ) : (
        <div className="no-image">
          <p>No image available</p>
        </div>
      )}
      <div className="desc">
        <h2>{props.title}</h2>
        <h3>Author(s): {props.author}</h3>
        <p>
          Published Date:{" "}
          {props.published === "0000"
            ? "Not Available"
            : props.published.substring(0, 4)}
        </p>
        {showDetails && (
          <>
            <p>
              {props.genre === undefined
                ? ""
                : props.genre === ""
                ? ""
                : "Genre(s): " + props.genre}
            </p>
            <p>
              {props.description === undefined
                ? "Description Not Available"
                : props.description === ""
                ? "Description Not Available"
                : "Description: " + props.description}
            </p>
          </>
        )}
        <p>
          Pages:{" "}
          {props.pages === undefined
            ? "Not Available"
            : props.pages === ""
            ? "Not Available"
            : props.pages}
        </p>
        <label>
          Current Page:
          <input
            type="number"
            min="1"
            max={props.pages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </label>
        <button
          className="fav-button"
          onClick={() => props.toggleFavorite(props.title)}
        >
          {props.isFavorite ? (
            <i class="fa-solid fa-heart"></i>
          ) : (
            <i class="fa-regular fa-heart"></i>
          )}
        </button>
        <button className="read-button" onClick={toggleDetails}>
          {showDetails ? "Show Less Details" : "Read More Details"}
        </button>

        {props.collections && (
          <select onChange={(e) => props.addToCollection(e.target.value)}>
            <option value="">Add to collection...</option>
            {props.collections.map((collection, index) => (
              <option key={index} value={index}>
                {collection.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default BookCard;
