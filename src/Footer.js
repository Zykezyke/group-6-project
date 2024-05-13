import React from "react";
import logoImage from "./images/logo.png";

const Footer = () => {
  return <footer>
    <div className="footer-content">
    <div className="navbar-brand">
          <img
            src={logoImage}
            alt=" Logo"
            className="logo-image"
            style={{ width: "60px", height: "50px" }}
          />
          <h1>LibROARy</h1>
        </div>
        <div className="socials">
          <i class="fa-brands fa-square-facebook"></i> 
          <i class="fa-brands fa-square-instagram"></i>
          <i class="fa-brands fa-square-x-twitter"></i>
          <i class="fa-solid fa-envelope"></i>
        </div>
    </div>
     
  </footer>;
};

export default Footer;