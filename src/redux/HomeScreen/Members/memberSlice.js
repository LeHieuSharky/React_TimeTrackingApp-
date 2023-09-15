import {createSlice} from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: [],
  reducers: {
    addMember: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
    updateHourOfMember: (state, action) => {
      let newState = [...state];
      const searchMember = newState.filter(
        member => member.memberId === action.payload.id,
      );
      if (searchMember.length > 0) {
        let newMember = {...searchMember[0]};
        newMember.hour = action.payload.hour;
        const index = newState.findIndex(
          member => member.memberId === action.payload.id,
        );
        newState.splice(index, 1);
        newState = [...newState, newMember];
      }
      return newState;
    },
    updateMinuteOfMember: (state, action) => {
      let newState = [...state];
      const searchMember = newState.filter(
        member => member.memberId === action.payload.id,
      );
      if (searchMember.length > 0) {
        let newMember = {...searchMember[0]};
        newMember.minute = action.payload.minute;
        const index = newState.findIndex(
          member => member.memberId === action.payload.id,
        );
        newState.splice(index, 1);
        newState = [...newState, newMember];
      }
      return newState;
    },
  },
});
const {reducer, actions} = memberSlice;
export const {addMember, updateHourOfMember, updateMinuteOfMember} = actions;

export default reducer;
