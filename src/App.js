import logo from "./logo.svg";
import React, { Component } from "react";
import Header from "./Header";
import Books from "./Books";
import "./App.css";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Books />
        <Footer />
      </div>
    );
  }
}
export default App;
