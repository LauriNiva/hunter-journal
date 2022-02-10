import { useEffect, useState } from 'react';
import './App.css';
import logsService from './services/logs';
import NewLogForm from './components/NewLogForm';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    isAuthenticated &&
    (async () => {
      const token = await getAccessTokenSilently();
      setLogs(await logsService.getAllLogs(token));
    })()
  }, [isAuthenticated]);

  return (
    <div>
      <Nav />
      <NewLogForm />
      <Logs logs={logs} />

    </div>
  );
}

export default App;
