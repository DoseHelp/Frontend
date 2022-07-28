/* eslint-disable */
import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { useEffect } from 'react';
import { getPatients } from '../services/patientServices';
import { StateContext } from '../utils/stateContext'

const pages = ['home', 'patients', 'manage','help','logout' ];
const settings = ['Logout'];

const ResponsiveAppBar = () => {
 
  const {store,dispatch} = useGlobalState()
  const {loggedInUser} = store
  const {anchorElNav} = store
  const {anchorElUser} = store
  
  const location = useLocation()
      useEffect(
      displayPatients(location, dispatch) 
      , 
      []
    ) 
    useEffect(
      displayPatients(location, dispatch)
      , 
      [location] 
    ) 
  
   

  const handleOpenNavMenu = (e) => {
    console.log("handleOpenNavMenu")
   
    dispatch({
        type: "setAnchorElNav",
        data: e.target.value
    })
  };
  const handleClickNavMenu = (e) => {
    
  };
  const handleOpenUserMenu = (e) => {
   
    dispatch({
        type: "setAnchorElUser",
        data: e.target.value
    })
  };

  const handleCloseNavMenu = () => {
    console.log("handleCloseNavMenu")
    dispatch({
        type: "setAnchorElNav",
        data: null
    })
  };

  const handleCloseUserMenu = () => {
    dispatch({
        type: "setAnchorElUser",
        data: null
    })
  };

  //to log out//
  const logout = ()=>{
    console.log("logedout")
      dispatch({
        type: "setLoggedInUser",
        data: ""
      })
      dispatch({
        type: "setToken",
        data: null
      })
     
  }
  useEffect(() => {
    getPatients()
    .then(patients => {
      dispatch({
        type: "setPatientsList",
        data: patients
      })
    })
  }, [dispatch]);
  
  return (
    <StateContext.Provider value={{store, dispatch}}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalPharmacyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DoseHelp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              value = "home"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              {loggedInUser && pages.map((page) => (
                loggedInUser ?
                  page !== "logout" ?
                <MenuItem key={page} value ={page.toLowerCase()} >
                  <Typography textAlign="center" href= {"/"+page.toLowerCase()}>{page}</Typography>
                </MenuItem>
                :
                <MenuItem key={page} value={page.toLowerCase()} >
                  <Typography textAlign="center" onClick={logout} href= {"/login"}>LogIn </Typography>
                </MenuItem>
                :
                <MenuItem key="login" value ="login" >
                  <Typography textAlign="center" href= {"/login"}>LogIn</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalPharmacyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DoseHelp
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {loggedInUser &&
            pages.map((page) => ( 

              <Button
                key={page}
                value={page.toLowerCase()}
                href= {"/"+page.toLowerCase()}
                onClick={handleClickNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={loggedInUser} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </StateContext.Provider> 
  );
};
export default ResponsiveAppBar;

const displayPatients = (location, dispatch, setError) =>{
    return () => {
     
      if   (location.pathname === "/patients") {
        getPatients()
          .then(patients => {
            // console.log("all patients")
            dispatch({
              type: "setPatientList",
              data: patients
            })
          })
          .catch(e => { console.log(e) })
      }
  
    }
  }