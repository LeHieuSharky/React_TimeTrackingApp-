const initState = {
  members: [],
};

const homeReducer = (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_MEMBER':
      return {
        ...state,
        members: [
          ...state.members,
          {
            fullName: 'LE NGUYEN DUC HIEU',
            title: 'Mobile Intern',
            leader: 'Tin Tran',
          },
        ],
      };

    default:
      return state;
  }
};

export default homeReducer;
