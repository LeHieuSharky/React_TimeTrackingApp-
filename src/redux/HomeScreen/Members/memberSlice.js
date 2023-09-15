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

[
  {
    leaderId: '068C121214',
    memberId: '8adf77c6-4e3c-4b22-8b33-59bb1b10a903',
    fullName: 'Hieu',
    title: 'Intern',
  },
  {
    leaderId: '068C121214',
    memberId: 'fa260cd3-072a-492a-be36-971232a0995a',
    fullName: ' Hieu 2 ',
    title: 'Intern 2',
  },
  {
    leaderId: '068C121213',
    memberId: '3efc4bc2-3d5f-426c-94aa-3648fcf2b325',
    fullName: 'Tuan ',
    title: '123',
  },
  {
    leaderId: '068C121213',
    memberId: '3c213dfb-3027-4f9d-b006-88b25998f55c',
    fullName: 'Tuan 222',
    title: '123 22',
  },
  {
    leaderId: '068C121214',
    memberId: '6ff387d1-dd99-4a9c-ae6f-e295bdf1bd11',
    fullName: 'Hieu',
    title: 'Intern',
    color: '',
    hour: '--',
    minute: '--',
  },
];
