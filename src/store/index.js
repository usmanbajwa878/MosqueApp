import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { reducer,persistedReducer } from "./reducers";
import { persistStore } from 'redux-persist';
import logger from 'redux-logger'



const composeEnhancers = 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const store = createStore(
//   reducer,
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk,logger))
);
const persistor = persistStore(store)
// export default store;
export default {store,persistor}