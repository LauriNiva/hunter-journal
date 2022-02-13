import { useEffect, useState } from 'react';
import './App.css';
import logsService from './services/logs';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    isAuthenticated &&
      (async () => {
        const token = await getAccessTokenSilently();
        setLogs(await logsService.getAllLogs(token));
      })()
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <Paper className="container">
          <Logs logs={logs} setLogs={setLogs} />
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
