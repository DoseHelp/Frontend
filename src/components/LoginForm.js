/* eslint-disable */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signIn } from "../services/authServices"
import { useGlobalState } from "../utils/stateContext"
// --------Styling----------- 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
//--------Styling-End---------- 

//--------Copy right----------
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          DoseHelp
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  //------copy Right end-- 


const LoginForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()
    
    const initialFormData = {
        email: "",
        password: ""
    }
    


    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        signIn(formData)
        .then((user) => {
            if(user.error){
                console.log("user.error", user.error)
                setError(user.error)
            }else{
                setError(null)
                sessionStorage.clear()
                sessionStorage.setItem("userID",  user.userID)
                sessionStorage.setItem("username",  user.username)
                sessionStorage.setItem("token",   user.jwt)
                
                dispatch({
                  type: "setUserID",
                  data: user.userID
              })
                dispatch({
                    type: "setLoggedInUser",
                    data: user.username
                })
                dispatch({
                    type: "setToken",
                    data: user.jwt
                })
                
                setFormData(initialFormData)
                navigate("/Landing")
            }
            
        })
        
        
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    
    const theme = createTheme();  


    useEffect(() => {
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
      
    }, []);

    return (
        <ThemeProvider theme={theme}>
             {error && <Alert severity="error">{error}</Alert>}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  value={formData.email} 
                  onChange={handleFormData}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                value={formData.password}
                 onChange={handleFormData}
                />
        
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id = "signin"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link href="signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
    }
    
    
    
    
    
    
    

export default LoginForm