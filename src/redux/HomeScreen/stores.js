import {configureStore} from '@reduxjs/toolkit';
import homeReducer from '../HomeScreen/slice';

const rootReducer = {
  members: homeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
