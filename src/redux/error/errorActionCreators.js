import { errorActions } from "./errorActionTypes"

export const setError= (data) => {
  return {
    type: errorActions.SET_MSG_ERROR,
    payload: data
  }
}

export const removeError = () => {
  return {
    type: errorActions.CLEAN_MSG_ERROR,
    payload: null
  }
}

export const openModalMsg= (data) => {
  return {
    type: errorActions.OPEN_MODAL_MSG,
    payload: true
  }
}

export const closeModalMsg= (data) => {
  return {
    type: errorActions.CLOSE_MODAL_MSG,
    payload: false
  }
}