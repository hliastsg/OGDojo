const user = localStorage.getItem("email")

export const LoginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: localStorage.getItem("email")
  }
}

export const LoginError = () => {
  return {
    type: 'LOGIN_ERROR',
    payload: null
  }
}

export const Logout = () => {
  return {
    type: 'LOGOUT',
    payload: user
  }
}