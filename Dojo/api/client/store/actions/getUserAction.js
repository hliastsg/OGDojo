const name = localStorage.getItem("name");
const surname = localStorage.getItem("surname");
const dob = localStorage.getItem("dob");

export const getUser = () => {
  return {
    type: 'GET_USER',
    name: name,
    surname: surname,
    dob: dob
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}
