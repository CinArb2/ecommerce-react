import { createStore, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducers';
import { loadFromLocalStorage, saveToLocalStorage } from '../helper/persistStore';

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => saveToLocalStorage(
  {
    cart: store.getState().cart
  }
));

export default store;