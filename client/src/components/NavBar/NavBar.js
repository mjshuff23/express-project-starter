import './NavBar.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Modal } from '@mui/material';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm'
import { logout } from '../../store/actions/authentication';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

export default function NavBar() {
  const [openL, setOpenL] = useState(false);
  const handleOpenL = () => setOpenL(true);
  const handleCloseL = () => setOpenL(false);
  const [openS, setOpenS] = useState(false);
  const handleOpenS = () => setOpenS(true);
  const handleCloseS = () => setOpenS(false);
  const dispatch = useDispatch()
  const reduxState = useSelector((state) => state);
  const loggedIn = reduxState.authentication.user.id !== ''
  useEffect(() => {
    console.log(loggedIn);
    return () => {
      
    }
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App!
          </Typography>
          <Button color="inherit" onClick={handleOpenS}>
            Signup
          </Button>
          <Button color="inherit" onClick={handleOpenL}>
            Login
          </Button>
          <Button color="inherit" onClick={()=>dispatch(logout())}>
            Logout
          </Button>

          <Modal
            open={openS}
            onClose={handleCloseS}
            aria-labelledby="login-modal"
          >
            <Box sx={style}>
              <SignupForm />
            </Box>
          </Modal>
          <Modal
            open={openL}
            onClose={handleCloseL}
            aria-labelledby="login-modal"
          >
            <Box sx={style}>
              <LoginForm />
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
