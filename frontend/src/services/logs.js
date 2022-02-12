import axios from "axios";


const baseURL = "http://localhost:3001/api/";

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

//Päivitä logia


const logsService = { getAllLogs };

export default logsService;