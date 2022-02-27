import axios from "axios";

const PORT = process.env.PORT || 3001;

const baseURL = `http://localhost:${PORT}/api/users`;


//Hae käyttäjän omat logit
const getUser = async (token) => {
  const userData = await axios
    .get(`${baseURL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return userData.data;
};


const createUser = async (user, token) => {

  const newUser = user;

  const userData = await axios
    .post(`${baseURL}`,
      newUser,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return userData.data;
};



const usersService = { getUser, createUser };

export default usersService;