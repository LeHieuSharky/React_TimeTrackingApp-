import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import memberReducer from './Members/memberSlice';
import dateTimeReducer from './DateTime/dateTimeSlice';

const rootReducer = {
  members: memberReducer,
  loggedUser: authReducer,
  listDateTime: dateTimeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

[
  {
    time: 'Thu Sep 14',
    members: ['cfb32ffe-a691-4a55-b320-d0f60d6ccb3f'],
  },
];
[{time: 'Thu Sep 14', members: ['40fed036-0195-41e9-8998-b6117f79e44e']}];
