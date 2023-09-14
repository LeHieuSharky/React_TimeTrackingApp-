import {createSlice} from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: [],
  reducers: {
    addMember: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
  },
});
const {reducer, actions} = memberSlice;
export const {addMember} = actions;

export default reducer;
