import { errorActions } from "./errorActionTypes"

const errorInitialState = {
  errorMsg: null,
  modalMsg: false,
}

const errorReducer = (state = errorInitialState, action) => {
  switch (action.type) {
    case errorActions.SET_MSG_ERROR:
      return {
        ...state,
        errorMsg: action.payload
      };
    case errorActions.CLEAN_MSG_ERROR:
      return {
        ...state,
        errorMsg: action.payload
      };
    case errorActions.OPEN_MODAL_MSG:
      return {
        ...state,
        modalMsg: action.payload
      };
      case errorActions.CLOSE_MODAL_MSG:
      return {
        ...state,
        modalMsg: action.payload
      };
    default:
      return state;
  }
}

export default errorReducer;