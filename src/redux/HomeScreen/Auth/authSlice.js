import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    addLoggedUser: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
  },
});

const {reducer, actions} = authSlice;
export const {addLoggedUser} = actions;

export default reducer;
