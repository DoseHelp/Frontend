import { useState } from "react"
import { useNavigate } from "react-router-dom"
const LoginForm = ({activateUser}) => {
    const navigate = useNavigate()
    //initial data in the form
    const initialFormData = {
        user: "",
        password: ""
    }
    const [formData, setFormData]= useState(initialFormData)
//when user press submit button
    const handleSubmit = (e) =>{
        e.preventDefault()
        //to clean the form after submition
        activateUser(formData.user)
        setFormData(initialFormData )
        navigate ("/home")
    }
    
    const handleFormData= (e) =>{
        // to get the data typed in either inputs in the form definig them by id
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
        
    }
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="email">Username:</label>        
                    <input type="text" name="user" id="user" value= {formData.user} onChange={handleFormData}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value= {formData.password} onChange={handleFormData}/>
                </div>
                <input type = "submit" value="Login"/>
            </form>
        </>
    )
} 
export default LoginForm