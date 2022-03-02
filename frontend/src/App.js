import { useEffect, useState } from 'react';
import './App.css';
import Logs from './components/Logs';
import Nav from './components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { createTheme, CssBaseline, Paper, ThemeProvider} from '@mui/material';
import { ConfirmProvider } from 'material-ui-confirm';
import usersService from './services/user';
import UserDataForm from './components/UserDataForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frontpage from './components/Frontpage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [username, setUsername] = useState();
  const [likedLogs, setLikedLogs] = useState([]);
  const [firstTimeSetupDialogOpen, setFirstTimeSetupDialogOpen] = useState(false);
  
  useEffect(() => {
    (!username && isAuthenticated) &&
      (async () => {
        const token = await getAccessTokenSilently();
        try {
          const user = await usersService.getUser(token);
          if(user?.username) {
            setUsername(user.username);
            setLikedLogs(user?.likedLogs)
          }else{
            setFirstTimeSetupDialogOpen(true);
          }
        } catch (err) {
          console.log(err)
         
        }
      })();
  }, [username, isAuthenticated, getAccessTokenSilently]);


  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ConfirmProvider>
          <Nav username={username} />
          <Paper className="container" sx={{ width: { sm: "100%", md: "95%" }, maxWidth: "1220px" }}>
          {isAuthenticated && 
          <UserDataForm username={username} setUsername={setUsername} dialogOpen={firstTimeSetupDialogOpen} setDialogOpen={setFirstTimeSetupDialogOpen} />
          }

            <Routes>
              <Route path="/" element={<Frontpage likedLogs={likedLogs} setLikedLogs={setLikedLogs} />} />
              <Route path="logs" element={<Logs likedLogs={likedLogs} setLikedLogs={setLikedLogs} />} />
              <Route path="*" element={<h1>404</h1>} />

            </Routes>

          </Paper>
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
