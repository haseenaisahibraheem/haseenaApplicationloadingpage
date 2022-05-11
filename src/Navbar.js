import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    document.cookie =
      "session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/login";
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">
          <img
            src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            alt=""
          />
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/authenticated/products">
                Products <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/authenticated/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/authenticated/checkout">
                Checkout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/authenticated/admin">
                Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/authenticated/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={this.handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
