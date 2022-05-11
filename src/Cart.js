import React from "react";
import { Link } from "react-router-dom";
import * as Cookies from "js-cookie";

const SHIPPING_COST = 10;

export class Cart extends React.Component {
  //TODO: MISSING NAVIGATION TO CHECKOUT

  constructor(props) {
    super(props);

    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.state = { products: JSON.parse(sessionStorage.getItem("cart")) || [] };
  }

  render() {
    if (Cookies.get("session_cookie") === undefined) {
      return <div>Not authenticated</div>;
    }

    if (this.state.products.length === 0) {
      return <h1>Empty Cart</h1>;
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map(product => {
                    return (
                      <tr key={product.id}>
                        <td className="col-sm-8 col-md-6">
                          <div className="media">
                            <img
                              alt=" "
                              className="media-object"
                              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"
                              style={{ width: "72px", height: "72px" }}
                            />
                            <div className="media-body">
                              <h4 className="media-heading">{product.title}</h4>
                            </div>
                          </div>
                        </td>
                        <td
                          className="col-sm-1 col-md-1"
                          style={{ textAlign: "center" }}
                        >
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            defaultValue={product.quantity}
                          />
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          <strong>{product.price}$</strong>
                        </td>
                        <td className="col-sm-1 col-md-1 text-center">
                          <strong>{product.quantity * product.price}$</strong>
                        </td>
                        <td className="col-sm-1 col-md-1">
                          <button
                            onClick={() =>
                              this.removeProductFromCart(product.id)
                            }
                            type="button"
                            className="btn btn-danger"
                          >
                            <span className="glyphicon glyphicon-remove" />{" "}
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>
                      <h5>Subtotal</h5>
                    </td>
                    <td className="text-right">
                      <h5>
                        <strong>{this.calculateTotal(false)}$</strong>
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>
                      <h5>Estimated shipping</h5>
                    </td>
                    <td className="text-right">
                      <h5>
                        <strong>{SHIPPING_COST}$</strong>
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>
                      <h3>Total</h3>
                    </td>
                    <td className="text-right">
                      <h3>
                        <strong>{this.calculateTotal(true)}$</strong>
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td> &nbsp; </td>
                    <td>
                      <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-shopping-cart" />{" "}
                        Continue Shopping
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-success">
                        <Link to="/authenticated/checkout">
                          Checkout <span className="glyphicon glyphicon-play" />
                        </Link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeProductFromCart(id) {
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    cart = cart.filter(item => item.id !== id);

    sessionStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ products: cart });
  }

  calculateTotal(withShipping) {
    var productsTotal = this.state.products.reduce(
      (total, item) => (total += item.quantity * item.price),
      0
    );

    if (withShipping) {
      return productsTotal + SHIPPING_COST;
    } else {
      return productsTotal;
    }
  }
}
