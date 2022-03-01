import axios from "axios";

const baseURL = `/api/logs`;

//Hae uusimmat logit (10)
const getRecentLogs = async () => {
  const recentLogs = await axios.get(`${baseURL}/recent`);
  console.log('recentlogs', recentLogs)

  return recentLogs.data;
};

//Hae tykätyimmät logit etusivulle

//Tykkää logista

//Hae käyttäjän omat logit
const getAllLogs = async (token) => {
  const allLogs = await axios
    .get(`${baseURL}`,
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
  const request = await axios.delete(`${baseURL}/${logId}`,
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


const logsService = { getAllLogs, deleteALog, getRecentLogs };

export default logsService;