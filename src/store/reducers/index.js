
import { combineReducers } from 'redux';
import mosque from './mosque';
import time from './time';
import notification from './notification';
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['mosque'] // only mosque will be persisted;
  };



export const reducer = combineReducers({
    mosque,
    time,
    notification
})
export const persistedReducer = persistReducer(persistConfig, reducer)


// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['mosque','navigation'] // only auth will be persisted;
//   };


// export const persistedReducer = persistReducer(persistConfig, reducer)