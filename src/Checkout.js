import { API_URL } from "./conf";
import React from "react";
import { Redirect } from "react-router-dom";
import * as Cookies from "js-cookie";

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      toProducts: false,
      products: JSON.parse(sessionStorage.getItem("cart"))
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlePayment(event) {
    event.preventDefault();

    fetch(API_URL + "/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardHolderName: this.state.cardHolderName,
        cardNumber: this.state.cardNumber,
        cardExpiryDate: this.state.cardExpiryDate,
        cardCvv: this.state.cardCvv,
        items: this.state.products
      })
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          toProducts: true
        });
        sessionStorage.clear();
      }
    });
  }

  render() {
    if (Cookies.get("session_cookie") === undefined) {
      return <div>Not authenticated</div>;
    }

    if (this.state.toProducts) {
      return <Redirect to="/authenticated/products" />;
    }
    return (
      <div className="container">
        <div className="row-fluid">
          <form className="form-horizontal">
            <fieldset>
              <div id="legend">
                <legend>Payment</legend>
              </div>
              {/* Name */}
              <div className="control-group">
                <label className="control-label">Card Holder's Name</label>
                <div className="controls">
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    name="cardHolderName"
                    className="input-xlarge"
                  />
                </div>
              </div>
              {/* Card Number */}
              <div className="control-group">
                <label className="control-label" htmlFor="email">
                  Card Number
                </label>
                <div className="controls">
                  <input
                    type="text"
                    onChange={this.handleInputChange}
                    name="cardNumber"
                    className="input-xlarge"
                  />
                </div>
              </div>
              {/* Expiry*/}
              <div className="control-group">
                <label className="control-label" htmlFor="password">
                  Card Expiry Date
                </label>
                <div className="controls">
                  <select
                    onSelect={this.handleInputChange}
                    className="span3"
                    name="expiry_month"
                    id="expiry_month"
                  >
                    <option />
                    <option value={1}>Jan (01)</option>
                    <option value={2}>Feb (02)</option>
                    <option value={3}>Mar (03)</option>
                    <option value={4}>Apr (04)</option>
                    <option value={5}>May (05)</option>
                    <option value={6}>June (06)</option>
                    <option value={7}>July (07)</option>
                    <option value={8}>Aug (08)</option>
                    <option value={9}>Sep (09)</option>
                    <option value={10}>Oct (10)</option>1
                    <option value={11}>Nov (11)</option>
                    <option value={12}>Dec (12)</option>
                  </select>
                  <select className="span2" name="expiry_year">
                    <option value={13}>2013</option>
                    <option value={14}>2014</option>
                    <option value={15}>2015</option>
                    <option value={16}>2016</option>
                    <option value={17}>2017</option>
                    <option value={18}>2018</option>
                    <option value={19}>2019</option>
                    <option value={20}>2020</option>
                    <option value={21}>2021</option>
                    <option value={22}>2022</option>
                    <option value={23}>2023</option>
                  </select>
                </div>
              </div>
              {/* CVV */}
              <div className="control-group">
                <label className="control-label" htmlFor="password_confirm">
                  Card CVV
                </label>
                <div className="controls">
                  <input
                    type="password"
                    id="password_confirm"
                    name="cardCVV"
                    className="span2"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              {/* Submit */}
              <div className="control-group">
                <div className="controls">
                  <button
                    className="btn btn-success"
                    onClick={this.handlePayment}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
