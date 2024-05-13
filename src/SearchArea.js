import React from "react";
import logoImage from "./images/logo.png";

const SearchArea = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img
            src={logoImage}
            alt=" Logo"
            className="logo-image"
            style={{ width: "60px", height: "50px" }}
          />
          <h1>LibROARy</h1>
        </div>
        <form onSubmit={props.searchBook} action="" className="search-form">
          <input
            onChange={props.handleSearch}
            type="text"
            required
            placeholder="Search for Books"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <select
            defaultValue="Sort"
            onChange={props.handleSort}
            className="sort-select"
          >
            <option disabled value="Sort">
              Sort
            </option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </form>
      </div>
    </nav>
  );
};

export default SearchArea;
