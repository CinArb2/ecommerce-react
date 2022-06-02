import { shopActions } from './shopActiontypes'
import axios from 'axios'
import { getConfig, getConfigFormData } from '../../helper/getConfig'
import { setIsLoading } from '../loader/loaderActionCreators'
import { openModalMsg, setError } from '../error/errorActionCreators'

const API_URL = 'http://localhost:3000/api/v1'



export const createShop = (data) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post(`${API_URL}/shop/`, data, getConfigFormData())
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      .then(() => dispatch(getShopUser()))
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 400) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}


// getCurrentShop
export const getShopUser = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/shop?user=me`, getConfig())
      .then((response) => dispatch(setShopUser(response.data.shop)))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(cleanShop())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}


export const getShopProducts = (id) => {
  return (dispatch) => {

    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/shop/products/${id}`, getConfig())
      .then((response) => dispatch(setShopProducts(response.data.shopProducts)))
      .catch(error => {
        if (error.response.status === 404) {
          console.log(error)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const getShopById = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/shop/${id}`, getConfig())
      .then((response) => dispatch(setShopSelected(response.data.shop)))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(cleanShop())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const deleteShop = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.delete(`${API_URL}/shop/${id}`, getConfig())
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      // .then(() => dispatch(cleanShop()))
      // .then(() => dispatch(cleanShopProducts()))
      .then(() => dispatch(getShopUser()))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const setShopSelected = (data) => {
  return {
    type: shopActions.SET_SELECTED_SHOP,
    payload: data
  }
}

export const updateShop = (id, formData) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.patch(`${API_URL}/shop/${id}`, formData,getConfigFormData())
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      .then(() => dispatch(getShopUser()))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const setShopUser = (data) => {
  return {
    type: shopActions.SET_SHOP_USER,
    payload: data
  }
}

export const setShopProducts = (data) => {
  return {
    type: shopActions.SET_SHOP_PRODUCTS,
    payload: data
  }
}

export const cleanShopProducts = () => {
  return {
    type: shopActions.CLEAN_SHOP_PRODUCTS,
    payload: {}
  }
}

export const cleanShop = () => {
  return {
    type: shopActions.CLEAN_SHOP,
    payload: {}
  }
}

export const cleanShopSelected = () => {
  return {
    type: shopActions.CLEAN_SHOP_SELECTED,
    payload: {}
  }
}