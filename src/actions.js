/*
 * action types
 */

export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const SET_PRODUCTS_FILTER = "SET_PRODUCTS_FILTER";

/*
 * other constants
 */
/*
 * action creators
 */

export function setSearchFilter(filter) {
  return { type: SET_PRODUCTS_FILTER, filter };
}

export function removeProductFromCart(productId) {
  return { type: REMOVE_PRODUCT_FROM_CART, productId };
}

export function addProductToCart(product) {
  return { type: ADD_PRODUCT_TO_CART, product };
}
