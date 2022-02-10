import axios from "axios";


const baseURL = "http://localhost:3001/api/";

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

const logsService = { getAllLogs };

export default logsService;