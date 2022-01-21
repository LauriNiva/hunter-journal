import { useEffect, useState } from 'react';
import './App.css';
import logsService from './services/logs';
import NewLogForm from './components/NewLogForm';

const App = () => {

  const [logs, setLogs] = useState([]);

  useEffect( () => {
    (async () => {
      setLogs( await logsService.getAllLogs());
    })()
  }, []);

  return (
    <div>
      <NewLogForm/>

    </div>
  );
}

export default App;
