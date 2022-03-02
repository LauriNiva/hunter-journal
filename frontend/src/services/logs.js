import axios from "axios";

const baseURL = `/api/logs`;

//Hae uusimmat logit (10)
const getRecentLogs = async () => {
  const recentLogs = await axios.get(`${baseURL}/recent`);
  console.log('recentlogs', recentLogs)

  return recentLogs.data;
};

//Hae tykätyimmät logit etusivulle
const getMostLikedLogs = async () => {
  const mostLikedLogs = await axios.get(`${baseURL}/mostliked`);
  console.log('mostLikedLogs', mostLikedLogs)

  return mostLikedLogs.data;
};

//Tykkää logista
const likeALog = async (logId, token) => {
  const updatedLog = await axios
    .put(`${baseURL}/${logId}/likes`, "like",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

  return updatedLog.data;
};

//Poista tykkäys logista
const dislikeALog = async (logId, token) => {
  const updatedLog = await axios
    .delete(`${baseURL}/${logId}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

  return updatedLog.data;
};


//Hae käyttäjän logit
const getAllLogs = async (username, token) => {
  const allLogs = await axios
    .get(`${baseURL}/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
  return allLogs.data;
};

//Lisää logi

//Poista logi
const deleteALog = async (logId, token) => {
  const request = await axios
    .delete(`${baseURL}/${logId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
  console.log('delete request.data', request)
  return request.data;

};

//Päivitä logia


const logsService = { getAllLogs, deleteALog, getRecentLogs, getMostLikedLogs, likeALog, dislikeALog };

export default logsService;