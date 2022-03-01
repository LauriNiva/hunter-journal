import { useEffect, useState } from 'react';
import './App.css';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, createTheme, CssBaseline, Dialog, Paper, ThemeProvider} from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import usersService from './services/user';
import UserDataForm from './components/UserDataForm';
import { Box } from '@mui/system';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const { isLoading, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [username, setUsername] = useState();
  const [usernameCheckedButNotFound, setUsernameCheckedButNotFound] = useState(false);
  

  useEffect(() => {
    (!username && isAuthenticated) &&
      (async () => {
        const token = await getAccessTokenSilently();
        try {
          const user = await usersService.getUser(token);
          setUsername(user.username);
        } catch (err) {
          setUsernameCheckedButNotFound(true);
          setDialogOpen(true);
        }
      })();
  }, [username, isAuthenticated, getAccessTokenSilently]);

  

  const [dialogOpen, setDialogOpen] = useState(false);
  

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ConfirmProvider>
          <Nav username={username} />
          <Paper className="container" sx={{ width: { sm: "100%", md: "95%" }, maxWidth: "1220px" }}>
          {isAuthenticated && 
          <UserDataForm username={username} setUsername={setUsername} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
          }

            <Routes>
              <Route path="/" element={<Frontpage />} />
              <Route path="logs" element={<Logs />} />
              <Route path="*" element={<h1>404</h1>} />

            </Routes>

          </Paper>
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
