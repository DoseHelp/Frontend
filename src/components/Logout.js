/* eslint-disable */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
const Logout = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate

      useEffect(() => {
        dispatch({
            type: "setLoggedInUser",
            data: ""
        })
        dispatch({
            type: "setToken",
            data: null
        })
        
      }, []);
    return (
        <>
        
        </>
    )
} 
export default Logout

