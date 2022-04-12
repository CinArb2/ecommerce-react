import { actions } from './actionTypes'

const initialState = {
  products: [],
  isLoading: false,
  selectedProduct: {},
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload
      };
    case actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case actions.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    default:
      return state;
  }
}