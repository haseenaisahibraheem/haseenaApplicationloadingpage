import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import "./styles.css";
import { Login } from "./Login";
import { Products } from "./Products";
import { Register } from "./Register";
import { About } from "./About";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import shopApp from "./reducers";
import { Provider } from "react-redux";
import { Admin } from "./Admin";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/authenticated/" component={Navbar} />
          <div className="container" style={{ marginTop: "10px" }}>
            <div>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/authenticated/checkout"
                component={Checkout}
              />
              <Route exact path="/authenticated/admin" component={Admin} />
              <Route
                exact
                path="/authenticated/products"
                component={Products}
              />
              <Route extact path="/authenticated/about" component={About} />
              <Route
                path="/authenticated/cart"
                render={props => <Cart products={this.state.products} />}
              />
            </div>
          </div>
          <Route path="/authenticated/" component={Footer} />{" "}
        </Router>
      </div>
    );
  }
}
const store = createStore(shopApp);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
