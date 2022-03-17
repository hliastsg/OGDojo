const initState = {
  name: null,
  surname: null,
  dob: null
};

const getUserReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        name: action.name,
        surname: action.surname,
        dob: action.dob
      }
    case 'CLEAR_USER':
      return {
        ...state,
        name: null,
        surname: null,
        dob: null
      }
    default: return state;
  }
}

export default getUserReducer;