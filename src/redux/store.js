import { createStore, applyMiddleware } from 'redux'
// import {productReducer} from './reducers'
import  thunk  from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store;