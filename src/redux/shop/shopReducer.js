import { shopActions } from './shopActiontypes'

const shopInitialState = {
  currentShop: {},
  shopProducts: []
}

const shopReducer = (state = shopInitialState, action) => {
  switch (action.type) {
   case shopActions.SET_SHOP:
      return {
        ...state,
        currentShop: action.payload
      };
    case shopActions.CLEAN_SHOP:
      return {
        ...state,
        currentShop:  action.payload
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