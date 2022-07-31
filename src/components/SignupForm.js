import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../services/authServices"
import { useGlobalState } from "../utils/stateContext"

const SignupForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()
    
    const initialFormData = {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        signUp(formData)
          .then((user) => {
            console.log(user)
            let errorMessage = "";
            if (user.error){
                // console.log(user.error)
                // convert the object into a string
                Object.keys(user.error).forEach(key => {
                    //console.log(key, user.error[key])
                    errorMessage = errorMessage.concat("", `${key} ${user.error[key]}`)
                })
                setError(errorMessage)
            }
            else {
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
                navigate("/landing")
            }
            
        })
        .catch(e => {console.log(e)})
        
        
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    return (
        <>
            <h4>Register user</h4>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleFormData}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
                <div>
                    <label htmlFor="password">Password confirmation:</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/>
                </div>
               
                <button variant="contained" type="submit">Sign up</button>
            </form>
        </>
    )

}

export default SignupForm