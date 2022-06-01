import { actionsCart } from './cartActionTypes'

const cartInitialState = {
  productsCart: []
}

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
   case actionsCart.ADD_TO_CART:
      return {
        ...state,
        productsCart: action.payload
      };
    case actionsCart.CLEAN_CART:
      return {
        ...state,
        productsCart: action.payload
      };
    default:
      return state;
  }
}

export default cartReducer;