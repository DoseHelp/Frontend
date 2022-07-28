//import { useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
const Navigation = () => {
    const {store,dispatch} = useGlobalState()
    const {loggedInUser} = store
    const navigate = useNavigate()
   // const location = useLocation()
    // useEffect(
    //     displayPatient(location, dispatch) 
    //     , 
    //     []
    //   ) 
    //   useEffect(
    //     displayPatient(location, dispatch)
    //     , 
    //     [location] 
    //   ) 
      
    const logout = (e) =>{
        e.preventDefault()
        dispatch({
            type: "setLoggedInUser",
            data: ""
        })
        dispatch({
            type: "setToken",
            data: null
        })
        navigate("/login")
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

