import { combineReducers } from "redux";
import {
  SET_PRODUCTS_FILTER,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART
} from "./actions";

function products(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCTS_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state.cart,
        [action.payload.title]: {
          ...state.action.payload.title,
          quantity: action.payload.quantity + 1,
          price: action.payload.price
        }
      };
    case REMOVE_PRODUCT_FROM_CART:
      var cart = state.cart.filter(product => product.id !== action.id);
      return {
        cart
      };
    default:
      return state;
  }
}

const shopApp = combineReducers({
  products
});

export default shopApp;
