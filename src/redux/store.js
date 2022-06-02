import { createStore, applyMiddleware } from 'redux'
import  thunk  from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducers';
import { loadFromLocalStorage, saveToLocalStorage } from '../helper/persistStore';

const persistedState = loadFromLocalStorage();

// const composeEnhancers = composeWithDevTools({ 
//     trace: true, 
//     traceLimit: 25 
// }); 

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
  // composeEnhancers(
  //   applyMiddleware(thunk) )
)


store.subscribe(() => saveToLocalStorage(
  {
    cart: store.getState().cart,
    shop: store.getState().shop,
  }
));

export default store;