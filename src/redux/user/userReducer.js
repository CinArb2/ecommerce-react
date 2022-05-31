import { userActions } from './userActiontypes'

const userInitialState = {
  userInfo: {},
  userOrders: {}
}

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
   case userActions.SET_USER_LOGED:
      return {
        ...state,
        userInfo: action.payload
      };
    case userActions.CLEAN_USER_LOGED:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;