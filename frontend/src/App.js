import { useEffect, useState } from 'react';
import './App.css';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, CssBaseline, Paper, ThemeProvider } from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import usersService from './services/user';
import UserDataForm from './components/UserDataForm';
import { Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';
import Userpage from './components/Userpage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [myUsername, setUsername] = useState();
  const [likedLogs, setLikedLogs] = useState([]);
  const [firstTimeSetupDialogOpen, setFirstTimeSetupDialogOpen] = useState(false);

  useEffect(() => {
    (!myUsername && isAuthenticated) &&
      (async () => {
        const token = await getAccessTokenSilently();
        try {
          const user = await usersService.getUser(token);
          if (user?.username) {
            setUsername(user.username);
            setLikedLogs(user?.likedLogs)
          } else {
            setFirstTimeSetupDialogOpen(true);
          }
        } catch (err) {
          console.log(err)

        }
      })();
  }, [myUsername, isAuthenticated, getAccessTokenSilently]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ConfirmProvider>
        <Nav myUsername={myUsername} />
        <Paper className="container" sx={{ width: { sm: "100%", md: "95%" }, maxWidth: "1220px" }}>
          {isAuthenticated &&
            <UserDataForm myUsername={myUsername} setUsername={setUsername} dialogOpen={firstTimeSetupDialogOpen} setDialogOpen={setFirstTimeSetupDialogOpen} />
          }

          <Routes>
            <Route path="/" element={<Frontpage likedLogs={likedLogs} setLikedLogs={setLikedLogs} />} />
            <Route path="logs" element={<Logs myUsername={myUsername} likedLogs={likedLogs} setLikedLogs={setLikedLogs} />} >
              <Route path=":usernameForLogs" element={<Logs myUsername={myUsername} likedLogs={likedLogs} setLikedLogs={setLikedLogs} />} />           
            </Route>
            <Route path='hunters'>
              <Route path=':username' element={<Userpage myUsername={myUsername} />} />
            </Route>
            


            <Route path="*" element={<h1>404</h1>} />

          </Routes>

        </Paper>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
