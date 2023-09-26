import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
    isLoggedIn: false,
  },
  reducers: {
    rememberLoggedIn: (state, action) => {
      const newState = {...action.payload};
      return newState;
    },
  },
});

const {reducer, actions} = authSlice;
export const {rememberLoggedIn} = actions;

export default reducer;
