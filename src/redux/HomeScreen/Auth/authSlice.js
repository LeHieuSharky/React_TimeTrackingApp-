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

[
  [
    {
      leaderId: '068C121214',
      memberId: '3a03eda1-b144-4a81-b9b4-4c2d051863ce',
      fullName: '',
      title: '',
      color: '',
      hour: '--',
      minute: '--',
    },
    {
      leaderId: '068C121214',
      memberId: 'affb14f2-1874-47dd-a374-d5f644de6a0d',
      fullName: 'Hieu',
      title: 'Ne',
      color: '',
      hour: '01',
      minute: '22',
    },
  ],
];
