import axios from "axios";

const baseURL = "http://localhost:3001/api/";

const getAllLogs = async () => {
  const allLogs = await axios.get(`${baseURL}`);
  console.log(`allLogs`, allLogs)
  return allLogs.data;
};

const logsService = { getAllLogs };

export default logsService;