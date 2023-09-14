import {createSlice} from '@reduxjs/toolkit';

export const dateTimeSlice = createSlice({
  name: 'dateTime',
  initialState: [],
  reducers: {
    addNewDateTime: (state, action) => {
      let newState = [...state];
      if (action.payload.hasOwnProperty('time')) {
        newState = [...newState, action.payload];
      } else {
        const index = newState.findIndex(
          element => element.time === action.payload.checkTime,
        );

        let newArrayMember = [
          ...newState[index].members,
          action.payload.idMember,
        ];

        let newObj = {...newState[index]};

        newObj.members = newArrayMember;
        newState.splice(index, 1);
        newState = [...newState, newObj];
      }

      return newState;
    },
  },
});

const {reducer, actions} = dateTimeSlice;
export const {addNewDateTime} = actions;

export default reducer;
