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

export const fetchRelatedProducts = (id) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
    dispatch(getRelatedProducts(response.data.data.products))
    dispatch(setIsLoading(false))
  }
}

export const fetchSelectedCategory = (id) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
    dispatch(setProductList(response.data.data.products))
    dispatch(setIsLoading(false))
  }
}

export const fetchProductQuery = (data) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${data}`)
    dispatch(setProductList(response.data.data.products))
    dispatch(setIsLoading(false))
  }
}

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
    dispatch(setCategories(response.data.data.categories))
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

export const getRelatedProducts = (data) => {
  return {
    type: actions.GET_RELATED_PRODUCTS,
    payload: data
  }
}

export const removeProductSelected = () => {
  return {
    type: actions.REMOVE_PRODUCT_SELECTED,
    payload: {}
  }
}

export const removeListRelated = () => {
  return {
    type: actions.REMOVE_LIST_RELATED,
    payload: []
  }
}

export const setCategories = (data) => {
  return {
    type: actions.SET_CATEGORIES,
    payload: data
  }
}

export const setModal = (isOpen) => {
  return {
    type: actions.OPEN_MODAL,
    payload: isOpen
  }
}