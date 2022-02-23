import { useEffect, useState } from 'react';
import './App.css';
import logsService from './services/logs';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, CssBaseline, Paper, ThemeProvider, Typography } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import usersService from './services/user';
import UserDataForm from './components/UserDataForm';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [username, setUsername] = useState();
  const [usernameCheckedButNotFound, setUsernameCheckedButNotFound] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    (!username && isAuthenticated) &&
      (async () => {
        const token = await getAccessTokenSilently();
        try {
          const user = await usersService.getUser(token);
          setUsername(user.username);
        } catch (err) {
          setUsernameCheckedButNotFound(true);
        }
      })();
  }, [username, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    (username && isAuthenticated) &&
      (async () => {
        const token = await getAccessTokenSilently();
        setLogs(await logsService.getAllLogs(token));
      })()
  }, [isAuthenticated, username, getAccessTokenSilently]);

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <ConfirmProvider>
          <Nav username={username} />
          <Paper className="container">
            {isAuthenticated ?
              username ?
                <Logs logs={logs} setLogs={setLogs} />
                : usernameCheckedButNotFound && <UserDataForm setUsername={setUsername} />
              : <Typography variant='h5' sx={{fontFamily:'Jaapokki', m:2}}>
                Please log in or create a account to start.
                </Typography>
            }
          </Paper>
        </ConfirmProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
