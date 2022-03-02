import axios from "axios";


const baseURL = `/api/users`;

//Hae käyttäjänimiä

const searchUsername = async (query, token) => {
  const usersFound = await axios
    .get(`${baseURL}/find/${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return usersFound.data;

};

//Hae käyttäjän omat tiedot
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

//Luo käyttäjä, eli lisää puuttuvat tiedot
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



const usersService = { getUser, createUser, searchUsername };

export default usersService;