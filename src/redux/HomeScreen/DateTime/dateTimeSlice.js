import {createSlice} from '@reduxjs/toolkit';

export const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState: [],
  reducers: {
    addNewDateTime: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
  },
});

const {reducer, actions} = dateTimeSlice;
export const {addNewDateTime} = actions;

export default reducer;
