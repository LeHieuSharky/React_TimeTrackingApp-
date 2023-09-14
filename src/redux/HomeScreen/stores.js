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
    leaderId: 'a708541f-24c2-46a7-9b76-6e43c3657b0e',
    memberId: 'b71819fd-963f-4781-add3-2dba54312f31',
    fullName: 'Hieu',
    title: 'Intern',
  },
  {
    leaderId: 'a708541f-24c2-46a7-9b76-6e43c3657b0e',
    memberId: 'f5ed1c59-12c3-4eab-865c-c2e5ee468130',
    fullName: 'Nguyen',
    title: 'Intern 2',
  },
];
