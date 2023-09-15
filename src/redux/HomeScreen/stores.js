import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import memberReducer from './Members/memberSlice';
import dateTimeReducer from './DateTime/dateTimeSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  members: memberReducer,
  leaders: authReducer,
  listDateTime: dateTimeReducer,
});

const persistConfig = {
  key: 'tracking',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
