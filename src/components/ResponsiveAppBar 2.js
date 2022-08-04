  /* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom"
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
import { getPatients } from '../services/patientServices';
import { StateContext } from '../utils/stateContext'
import StyledMenu from './StyledMenu';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Alert from '@mui/material/Alert';

const pages = ['home', 'patients', 'manage','help','logout' ];
const settings = ['Logout'];


const ResponsiveAppBar = () => {
  const navigate = useNavigate()
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
  // const handleOpenUserMenu = (e) => {
   
  //   dispatch({
  //       type: "setAnchorElUser",
  //       data: e.target.value
  //   })
  // };

  const handleCloseNavMenu = () => {
    console.log("handleCloseNavMenu")
    dispatch({
        type: "setAnchorElNav",
        data: null
    })
  };

  // const handleCloseUserMenu = () => {
  //   dispatch({
  //       type: "setAnchorElUser",
  //       data: null
  //   })
  // };
  const deleteItems=()=> {
    sessionStorage.clear();
     navigate("/login")
  }
  //to log out//
  const logout = ()=>{
      dispatch({
        type: "setLoggedInUser",
        data: ""
      })
      dispatch({
        type: "setToken",
        data: null
      })
      dispatch({
        type: "setUserID",
        data: ""
      })
      deleteItems()
  }
  useEffect(() => {
    getPatients()
    .then(patients => {
      if(patients.error){
        console.log("patients.error", patients.error)
        setError(patients.error)
      }else{
        setError(null)
        dispatch({
        type: "setPatientsList",
        data: patients
        })
      }
    })
  }, [dispatch]);
 
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StateContext.Provider value={{store, dispatch}}>
    {error && <Alert severity="error">{error}</Alert>}
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
                  <Typography textAlign="center" onClick={logout} >LogIn </Typography>
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
          {/* NAV BAR ITEMS */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {loggedInUser &&
              <>
                <Button
                  key= "home"
                  value="home"
                  href= "/home"
                  onClick={handleClickNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  HOME
                </Button> 



                <Button
                  key= "patients"
                  value="patients"
                  href= "/patients"
                  onClick={handleClickNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  PATIENTS
                </Button> 
                
                
                
                <Button
                  key= "manage"
                  value="manage"
                  sx={{ my: 2, color: 'white'}}
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}>
                  manage
                </Button> 
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      <EditIcon />
                      Doctors
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      <VaccinesIcon />
                      Drugs
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose} disableRipple>
                      <FileCopyIcon />
                      Reports
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      <PersonIcon />
                      Users
                    </MenuItem>
                  </StyledMenu>


                  <Button
                  key= "logout"
                  value="logout"
                  onClick={logout}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  LOGOUT
                </Button> 
              </>
            }

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt={loggedInUser} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            
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
            if(patients.error){
              console.log("patients.error", patients.error)
              setError(patients.error)
             }else{
              dispatch({
                type: "setPatientList",
                data: patients
              })
          }
          })
          .catch(e => { console.log(e) })
      }
  
    }
  }