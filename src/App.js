import logo from "./logo.svg";
import React, { Component } from "react";
import Books from "./Books";
import "./App.css";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Books />
        <Footer />
      </div>
    );
  }
}
export default App;
