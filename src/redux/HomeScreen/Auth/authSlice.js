import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    addLeader: (state, action) => {
      let newState = [...state];
      const check = newState.find(leader => leader.id === action.payload.id);
      if (check === undefined) {
        newState = [...newState, action.payload];
      }
      return newState;
    },
    updateMemberOfLeader: (state, action) => {
      let newState = [...state];
      let searchLeader = newState.filter(
        leader => leader.id === action.payload.leaderId,
      );
      if (searchLeader.length > 0) {
        let leader = {...searchLeader[0]};
        const newMemberArray = [...leader.members, action.payload.memberId];
        const index = newState.findIndex(
          item => item.id === action.payload.leaderId,
        );
        leader.members = newMemberArray;

        newState.splice(index, 1);
        newState = [...newState, leader];
      }
      return newState;
    },
  },
});

const {reducer, actions} = authSlice;
export const {addLeader, updateMemberOfLeader} = actions;

export default reducer;
