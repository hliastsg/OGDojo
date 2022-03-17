import Cookies from "universal-cookie";

const cookie = new Cookies();

const initState = {
  token : cookie.get("access_token"),
  isAuthenticated: false,
  user: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      }  
    default: return state;
  }
};

export default authReducer;