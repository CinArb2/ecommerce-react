import { userActions } from './userActiontypes' 
import axios from 'axios'
import { getConfig, getConfigFormData } from '../../helper/getConfig'
import { setIsLoading } from '../loader/loaderActionCreators'

const API_URL = 'http://localhost:3000/api/v1'

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return axios.get(`${API_URL}/users/`, getConfig())
      .then((response) => dispatch(setUserInfo(response.data.userSession)))
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