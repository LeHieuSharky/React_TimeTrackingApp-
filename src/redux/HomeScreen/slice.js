import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'homeScreen',
  initialState: [],
  reducers: {
    addNewMember: (state, action) => {
      state.push(action.payload);
    },
  },
});
const {reducer, actions} = homeSlice;
export const {addNewMember} = actions;

export default reducer;
