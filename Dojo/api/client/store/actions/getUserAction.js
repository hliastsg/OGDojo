const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const surname = localStorage.getItem("surname");
const dob = localStorage.getItem("dob").toString().split("T")[0];

export const getUser = () => {
  return {
    type: 'GET_USER',
    name: name,
    surname: surname,
    email: email,
    dob: dob
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}
