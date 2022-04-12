import { createStore, applyMiddleware } from 'redux'
import {productReducer} from './reducers'
import  thunk  from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
  productReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store;