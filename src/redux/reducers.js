import { actions } from './actionTypes'

const initialState = {
  products: [],
  isLoading: false,
  isOpenModal: false,
  selectedProduct: {},
  relatedProd: [],
  categories: []
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
    case actions.GET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProd: action.payload
      };
    case actions.REMOVE_PRODUCT_SELECTED:
      return {
        ...state,
        selectedProduct: action.payload
      };
    case actions.REMOVE_LIST_RELATED:
      return {
        ...state,
        relatedProd: action.payload
      };
    case actions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case actions.OPEN_MODAL:
      return {
        ...state,
        setModal: action.payload
      };
    default:
      return state;
  }
}