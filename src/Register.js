import React from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "./conf";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = { toLogin: false };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.toLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Application
              <br /> Register Page
            </h2>
            <p>LRegister from here to access.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    name="username"
                    type="text"
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="User Name"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button
                  onClick={this.handleRegister}
                  type="submit"
                  className="btn btn-black"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleRegister(event) {
    fetch(API_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          toLogin: true
        });
      } else {
        alert("Unable to login, invalid user or password");
      }
    });
    event.preventDefault();
  }
}
