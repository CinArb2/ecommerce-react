import { userActions } from './userActiontypes' 
import axios from 'axios'
import { getConfig, getConfigFormData } from '../../helper/getConfig'
import { setIsLoading } from '../loader/loaderActionCreators'
import { getProductsCart } from '../cart/cartActionCreators'

const API_URL = 'http://localhost:3000/api/v1'

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/users/`, getConfig())
      .then((response) => dispatch(setUserInfo(response.data.userSession)))
      .then(()=> dispatch(getProductsCart()))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(cleanUserInfo())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const updateUserInfo = (id, formdata) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.patch(`${API_URL}/users/${id}`, formdata, getConfigFormData())
      .then(() => dispatch(getUserInfo()))
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          dispatch(cleanUserInfo())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const getUserOrders = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/users/orders`, getConfig())
      .then((response) => dispatch(setUserOrders(response.data.userOrders)))
      .catch(error => {
        if (error.response.status === 404) {
          
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const setUserInfo = (data) => {
  return {
    type: userActions.SET_USER_LOGED,
    payload: data
  }
}

export const cleanUserInfo = () => {
  return {
    type: userActions.CLEAN_USER_LOGED,
    payload: {}
  }
}

export const setUserOrders = (data) => {
  return {
    type: userActions.SET_USER_ORDERS,
    payload: data
  }
}

export const cleanUserOrders = () => {
  return {
    type: userActions.SET_USER_ORDERS,
    payload: {}
  }
}