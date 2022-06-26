const user = localStorage.getItem("email");

export const getDate = () => {
  return {
    type: 'GET_DATE',
    payload: localStorage.getItem("email")
  }
}