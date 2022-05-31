import { productActions } from "./productActionTypes";

const initialState = {
  productList: [],
  selectedProduct: {},
  relatedProd: [],
  categories: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productActions.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case productActions.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    case productActions.GET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProd: action.payload
      };
    case productActions.REMOVE_PRODUCT_SELECTED:
      return {
        ...state,
        selectedProduct: action.payload
      };
    case productActions.REMOVE_LIST_RELATED:
      return {
        ...state,
        relatedProd: action.payload
      };
    case productActions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
}