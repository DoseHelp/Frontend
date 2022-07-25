import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signIn } from "../services/authServices"
import { useGlobalState } from "../utils/stateContext"
// --------Styling----------- 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//--------Styling----------- 
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
                sessionStorage.setItem("username",  user.username)
                sessionStorage.setItem("token", user.jwt)
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
    return (
        <>
        {error && <p>{error}</p>}
        <Card variant = "outlined" sx={{ maxWidth: 275  }}>
            <CardContent>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </CardContent>
        <CardActions>
        
        </CardActions>
        </Card>
        </>
    )

}

export default LoginForm