import React from "react";
import { API_URL } from "./conf";

export class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      transactions: [],
      query: ""
    };

    this.handleOnSearchInput = this.handleOnSearchInput.bind(this);
  }

  handleOnSearchInput(event) {
    this.setState({
      query: event.target.value
    });
  }

  componentDidMount() {
    fetch(API_URL + "/admin", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.error) {
            this.setState({
              isLoaded: true,
              error: result.error
            });
          } else {
            this.setState({
              isLoaded: true,
              transactions: result
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }

    if (this.state.transactions.length === 0) {
      return <h1>No transcations</h1>;
    }
    return (
      <div>
        <h2>Transactions</h2>
        <p>Search by username</p>
        <input
          className="form-control"
          id="myInput"
          type="text"
          onChange={this.handleOnSearchInput}
          placeholder="Search.."
        />
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions
              .filter(transcation =>
                transcation.username.startsWith(this.state.query)
              )
              .map((transaction, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{transaction.username}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.total}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
