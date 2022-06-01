import axios from 'axios'
import { productActions } from './productActionTypes'
import { setIsLoading } from '../loader/loaderActionCreators'
import { getConfig, getConfigUpdate } from '../../helper/getConfig'
import { getShopProducts } from '../shop/shopActionCreators'

const API_URL = 'http://localhost:3000/api/v1'

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`${API_URL}/products`)
    dispatch(setProductList(response.data.products))
    dispatch(setIsLoading(false))
  }
}

export const fetchSelectedProduct = (id) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`${API_URL}/products/${id}`)
    dispatch(setSelectedProduct(response.data.product))
    dispatch(setIsLoading(false))
  }
}

export const fetchRelatedProducts = (id) => {
  
  return async (dispatch) => {
    const response = await axios.get(`${API_URL}/products?category=${id}`)
    dispatch(getRelatedProducts(response.data.products))
  }
}

export const fetchSelectedCategory = (id) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const response = await axios.get(`${API_URL}/products?category=${id}`)
    dispatch(setProductList(response.data.products))
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


export const deleteProductById = (id, shopId) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.delete(`${API_URL}/products/${id}`, getConfig())
      .then(() => dispatch(getShopProducts(shopId)))
      .catch(error => {
        if (error.response.status === 404) {
          console.log(error.response)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const updateProduct = (id, formdata, shopId) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post(`${API_URL}/products/${id}`, formdata, getConfigUpdate())
      .then(response => console.log(response))
      .then(()=> dispatch(getShopProducts(shopId)))
      .catch(error => {
        if (error.response.status === 404) {
          console.log(error.response)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await axios.get(`${API_URL}/products/categories`)
    dispatch(setCategories(response.data.categories))
  }
}

export const setProductList = (data) => {
  return {
    type: productActions.SET_PRODUCT_LIST,
    payload: data
  }
}

export const setSelectedProduct = (data) => {
  return {
    type: productActions.SET_SELECTED_PRODUCT,
    payload: data
  }
}

export const getRelatedProducts = (data) => {
  return {
    type: productActions.GET_RELATED_PRODUCTS,
    payload: data
  }
}

export const removeProductSelected = () => {
  return {
    type: productActions.REMOVE_PRODUCT_SELECTED,
    payload: {}
  }
}

export const removeListRelated = () => {
  return {
    type: productActions.REMOVE_LIST_RELATED,
    payload: []
  }
}

export const setCategories = (data) => {
  return {
    type: productActions.SET_CATEGORIES,
    payload: data
  }
}