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

const getUserpageData = async (username, token) => {
  const userpageData = await axios
    .get(`${baseURL}/userpage/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );

  return userpageData.data;
};

const getAvatar = async (username) => {
  const avatar = await axios.get(`${baseURL}/${username}/avatar`);
  return avatar.data;
};

const updateAvatar = async (avatar, token) => {

  const newAvatar = avatar;

  const updatedAvatar = await axios
    .put(`${baseURL}/avatar`,
      newAvatar,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return updatedAvatar.data;

};

const followAUser = async (userToFollow, token) => {
  const updatedUser = await axios
    .put(`${baseURL}/${userToFollow}/follow`,
      'follow',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return updatedUser.data;
};

const addHighlightedLog = async (logid, token) => {
  const addHighlightedLog = await axios
    .post(`${baseURL}/highlight/log`,
      { logid: logid },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return addHighlightedLog.data;
};

const removeHighlightedLog = async (token) => {

};


const editHighlightedText = async (newText, token) => {
  const editedText = await axios
    .post(`${baseURL}/highlight/text/`,
      { newText: newText },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
  return editedText.data;
};


const usersService = {
  getUser, createUser, searchUsername, followAUser, updateAvatar, getAvatar,
  addHighlightedLog, removeHighlightedLog, editHighlightedText, getUserpageData
};

export default usersService;