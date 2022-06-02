import { userActions } from './userActiontypes' 
import axios from 'axios'
import { getConfig, getConfigFormData, getConfigSignUp } from '../../helper/getConfig'
import { setIsLoading } from '../loader/loaderActionCreators'
import { getProductsCart } from '../cart/cartActionCreators'
import { openModalMsg, setError } from '../error/errorActionCreators'
import { getShopUser } from '../shop/shopActionCreators'

const API_URL = 'http://localhost:3000/api/v1'


export const loginUser = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post(`${API_URL}/users/login`, formData)
      .then((res) => localStorage.setItem('token', res.data.token))
      // .then(() => dispatch(setError('success')))
      // .then(() => dispatch(openModalMsg()))
      .then(() => dispatch(getUserInfo()))
      .then(() => dispatch(getShopUser()))
      .catch(error => {
        if (error.response.status === 400) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}

export const signUp = (formData) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.post(`${API_URL}/users/`, formData, getConfigSignUp())
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      .catch(error => {
        if (error.response.status === 404) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
        }
        if (error.response.status === 500) {
          dispatch(setError(error.response.data.error.errors[0].message))
          dispatch(openModalMsg())
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
}


export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/users/`, getConfig())
      .then((response) => dispatch(setUserInfo(response.data.userSession)))
      // .then(()=> dispatch(getProductsCart()))
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
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      .then(() => dispatch(getUserInfo()))
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
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

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.delete(`${API_URL}/users/${id}`, getConfig())
      .then(() => dispatch(setError('success')))
      .then(() => dispatch(openModalMsg()))
      .then(() => localStorage.setItem('token', ''))
      .then(() => localStorage.setItem('store', ''))
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          dispatch(setError(error.response.data.message))
          dispatch(openModalMsg())
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