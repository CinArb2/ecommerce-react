import { SET_IS_LOADING } from "./loaderActionTypes"

export const setIsLoading = (isLoading) => {
  return {
    type: SET_IS_LOADING,
    payload: isLoading
  }
}

export default setIsLoading;