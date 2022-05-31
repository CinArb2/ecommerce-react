import {combineReducers} from 'redux'
import { productReducer } from './products/productReducers';
import cartReducer from './cart/cartReducer'
import loaderReducer from './loader/loaderReducer'
import userReducer from './user/userReducer'
import shopReducer from './shop/shopReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  loader: loaderReducer,
  users: userReducer,
  shop: shopReducer,
})

export default rootReducer;