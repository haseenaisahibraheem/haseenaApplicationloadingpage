import React from "react";
import { Product } from "./Product";
import { API_URL } from "./conf";
var _ = require("lodash");

export class Products extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);

    this.state = {
      error: null,
      isLoaded: false,
      products: [],
      query: ""
    };
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleAddProductToCart(product) {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart) {
      var item = cart.find(i => i.id === product.id);
      if (item) {
        item.quantity++;
        this.storeCart(cart);
      } else {
        // New Item in cart

        cart.push({
          ...product,
          quantity: 1
        });
        this.storeCart(cart);
      }
    } else {
      this.storeCart([
        {
          ...product,
          quantity: 1
        }
      ]);
    }
    alert("Item added to cart");
  }

  storeCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
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

    var products = _.chunk(
      this.state.products.filter(
        p => p.title && p.title.startsWith(this.state.query)
      ),
      3
    ).map((chunk, idx) => {
      return (
        <div key={idx} className="card-group">
          {chunk.map(product => {
            return (
              <Product
                key={product.id}
                image={product.image}
                title={product.title}
                text={product.text}
                price={product.price}
                addToCart={() => this.handleAddProductToCart(product)}
              />
            );
          })}
        </div>
      );
    });

    return (
      <div>
        <input
          className="form-control mr-sm-2"
          type="search"
          onChange={this.handleChange}
          placeholder="Search Products"
          aria-label="Search"
        />
        {products}
      </div>
    );
  }

  componentDidMount() {
    fetch(API_URL + "/products", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            products: result,
            error: result.error
          });
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
}
