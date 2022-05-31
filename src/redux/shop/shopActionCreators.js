import { shopActions } from './shopActiontypes'
import axios from 'axios'
import { getConfig } from '../../helper/getConfig'
import { setIsLoading } from '../loader/loaderActionCreators'

const API_URL = 'http://localhost:3000/api/v1'


export const getCurrentShop = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/shop?user=me`, getConfig())
      .then((response) => dispatch(setShop(response.data.shop)))
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
          console.log(error.response)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const getShopById = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/shop/${id}`, getConfig())
      .then((response) => dispatch(setShop(response.data.shop)))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(cleanShop())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const setShop = (data) => {
  return {
    type: shopActions.SET_SHOP,
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