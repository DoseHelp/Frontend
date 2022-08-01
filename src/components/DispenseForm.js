import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createDispense } from "../services/patientServices"
import { useGlobalState } from "../utils/stateContext"
import Alert from '@mui/material/Alert'
import PatientSelector from "./PatientSelector"

const DispenseForm = () => {
    const { dispatch} = useGlobalState()
    // const {loggedInUser}= store
    const navigate = useNavigate()
    const initialFormData = {
        id:"",
        user_id:"",
        prescription_id: ""
    }
    const [formData,setFormData]= useState(initialFormData)
    const [error, setError] = useState(null)
    // const handleFormData = (e) =>{
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value
    //     })
    // }
    // to add the patient to the list
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log(formData)
        addDispense(formData)
        cleanDispense()
    }
    const addDispense = (data)=>{
        createDispense (data)
        .then(dispense =>{
            if(dispense.error){
                console.log("dispense.error", dispense.error)
                setError(dispense.error)
            }else{
                dispatch({
                    type: "addDispense",
                    data: dispense
                })
                navigate("/home")
            }
        })
    }
    //to clean the form
    const cleanDispense= () =>{
        setFormData(initialFormData)
    }
    return (
        <>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
            <PatientSelector>

            </PatientSelector>
            {/* <div>
                <input type="submit" value="Save"/>
                <button onClick={cleanDispense}>Reset</button>
            </div> */}
        </form>
        </>
    )
} 
export default DispenseForm


