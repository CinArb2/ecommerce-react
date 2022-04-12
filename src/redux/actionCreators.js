import { actions } from './actionTypes'
import axios from 'axios'

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
    dispatch(setProductList(response.data.data.products))
    dispatch(setIsLoading(false))
  }
}

export const setProductList = (data) => {
  return {
    type: actions.SET_PRODUCT_LIST,
    payload: data
  }
}


export const setIsLoading = (isLoading) => {
  return {
    type: actions.SET_IS_LOADING,
    payload: isLoading
  }
}

export const setSelectedProduct = (data) => {
  return {
    type: actions.SET_SELECTED_PRODUCT,
    payload: data
  }
}