import React from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { API_URL } from "./conf";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = { toHome: false, rememberMe: false };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to="/authenticated/products" />;
    }

    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Application
              <br /> Login Page
            </h2>
            <p>Login or register from here to access.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    name="username"
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    onChange={this.handleInputChange}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-check">
                  <input
                    onChange={this.handleInputChange}
                    type="checkbox"
                    className="form-check-input"
                    name="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember Me?
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={this.handleLogin}
                  className="btn btn-black"
                >
                  Login
                </button>
                <button type="submit" className="btn btn-secondary">
                  <Link to="/register">Register</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleLogin(event) {
    event.preventDefault();
    fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        rememberMe: this.state.rememberMe
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          toHome: true
        });
      } else {
        alert("Unable to login, invalid user or password");
      }
    });
  }
}
