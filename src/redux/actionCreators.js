import { actions } from './actionTypes'
import axios from 'axios'
import { getConfig } from '../helper/getConfig'

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
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
    dispatch(getRelatedProducts(response.data.data.products))
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


export const getCart = ( ) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
    dispatch(setCart(response.data.data.cart))
    dispatch(setIsLoading(false))
  }
}

export const addToCart = (product) => {
  return  (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, product, getConfig())
      .then(() => dispatch(getCart()))
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const deleteProduct = (id) => {
  return  (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
                .then(() => dispatch(getCart()))
                .finally(()=> dispatch(setIsLoading(false)))
  }
}


export const updateCart = (product) => {
  return  (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.patch(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, product, getConfig())
      .then(() => dispatch(getCart()))
      .finally(()=> dispatch(setIsLoading(false)))
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

export const setCart = (data) => {
  return {
    type: actions.ADD_TO_CART,
    payload: data
  }
}

export const cleanInfoCart = () => {
  return {
    type: actions.CLEAN_CART,
    payload: {}
  }
}

