import { Link, useNavigate } from "react-router-dom"


const Navigation = ({loggedInUser,activateUser}) => {

    const navigate = useNavigate()
    const logout = (e) =>{
        e.preventDefault()
        activateUser("")
        navigate("/")
    }
    return (
        <nav>
            {
            loggedInUser && 
                <>
                <Link to = "/">Home</Link>
                <Link to = "/patients">Patients</Link>
                <Link to = "/manage">Manage</Link>
                <Link to = "/help">Help</Link>
                <div>{loggedInUser}</div> 
                <Link to = "/" onClick={logout} >Log Out</Link>
                </>
            }
        </nav>
    )
} 
export default Navigation