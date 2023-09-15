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
  {
    leaderId: '068C121214',
    memberId: '3ee0231d-059d-4b9f-8d05-734b56b1ff42',
    fullName: 'Hieu',
    title: 'Intern',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '4814c7ae-9986-4892-a08b-88c483adeebf',
    fullName: 'Nhiềun',
    title: 'Intern 2',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '4536dac3-50c5-4b96-a0a9-a9ab2cd9f844',
    fullName: '43',
    title: '34',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '144031c4-9bb3-4121-80e8-9ee95ee49e88',
    fullName: '43',
    title: '342323',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '19ddbfcd-adce-4cba-8cf5-ab14e90e9417',
    fullName: 'Heiu',
    title: 'Intenr',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '0c9727fe-adf4-43cc-bb05-018ef5fc3c36',
    fullName: 'Hieu',
    title: 'Intern',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: 'ef0f9bf9-9abb-4532-9ae5-d1c480c02eef',
    fullName: 'Hieu',
    title: 'Intern',
    color: '',
    hour: '--',
    minute: '--',
  },
  {
    leaderId: '068C121214',
    memberId: '4b3fc949-456d-4031-907d-9c421f664f14',
    fullName: 'Hieu',
    title: 'Intern',
    color: '',
    hour: '--',
    minute: '--',
  },
];
