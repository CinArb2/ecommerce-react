import { shopActions } from './shopActiontypes'

const shopInitialState = {
  shopUser: {},
  shopSelected: {},
  shopProducts: []
}

const shopReducer = (state = shopInitialState, action) => {
  switch (action.type) {
   case shopActions.SET_SHOP_USER:
      return {
        ...state,
        shopUser: action.payload
      };
    case shopActions.CLEAN_SHOP:
      return {
        ...state,
        shopUser: action.payload
      };
    case shopActions.SET_SELECTED_SHOP:
      return {
        ...state,
        shopSelected: action.payload
      };
    case shopActions.CLEAN_SHOP_SELECTED:
      return {
        ...state,
        shopSelected:  action.payload
      };
    case shopActions.SET_SHOP_PRODUCTS:
      return {
        ...state,
        shopProducts: action.payload
      };
    case shopActions.CLEAN_SHOP_PRODUCTS:
      return {
        ...state,
        shopProducts: action.payload
      };
    default:
      return state;
  }
}

export default shopReducer;