const today = new Date();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

const getDateReducer = (state = today, action) => {
  switch (action.type) {
    case 'GET_DATE':
      return {
        ...state,
        today: yyyy + '-' + mm + '-' + dd
      }
    default: return state;
  }
};
export default getDateReducer;
