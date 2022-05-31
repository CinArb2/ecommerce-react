import { actionsCart } from './cartActionTypes'


const cartReducer = (state = {}, action) => {
  switch (action.type) {
   case actionsCart.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload
      };
    case actionsCart.CLEAN_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
}

export default cartReducer;