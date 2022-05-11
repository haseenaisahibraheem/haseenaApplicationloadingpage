import React from "react";

export class Product extends React.Component {
  constructor(props) {
    super();
    this.handleOnAddItemToCart = this.handleOnAddItemToCart.bind(this);
  }
  render() {
    return (
      <div className="card">
        <img src={this.props.image} className="card-img-top" alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.text}</p>
          <p className="card-text">
            <small className="text-muted">{this.props.price}$</small>
          </p>
          <button
            onClick={() => this.handleOnAddItemToCart(this.props.id)}
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }

  handleOnAddItemToCart(id) {
    this.props.addToCart(id);

    //TODO: Store into Redux
  }
}
