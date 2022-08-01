import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPatient } from "../services/patientServices"
import { useGlobalState } from "../utils/stateContext"
import Alert from '@mui/material/Alert'

const PatientForm = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser}= store
    const navigate = useNavigate()
    const initialFormData = {
        id:"",
        first_name:"",
        surname:""	,
        dob:""	,
        address:""	,
        phone:""	,
        gender:""	,
        ihi:""
    }
    const [formData,setFormData]= useState(initialFormData)
    const [error, setError] = useState(null)
    const handleFormData = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    // to add the patient to the list
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log(formData)
        addPatient(formData)
        cleanPatient()
    }
    const addPatient = (data)=>{
        createPatient (data)
        .then(patient =>{
            if(patient.error){
                console.log("patient.error", patient.error)
                setError(patient.error)
            }else{
                dispatch({
                    type: "addPatient",
                    data: patient
                })
                navigate("/home")
            }
        })
    }
    //to clean the form
    const cleanPatient= () =>{
        setFormData(initialFormData)
    }
    return (
        <>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
            <h3>{loggedInUser}</h3>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="" id="first_name" value={formData.first_name} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="surname">Surname:</label>
                <input type="text" name="" id="surname" value={formData.surname} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="dob">Date Of Birth:</label>
                <input type="date" name="" id="dob" value={formData.dob} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="address" name="" id="address" style={{width :'50%'}} value={formData.address} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="" id="phone" value={formData.phone} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <input type="text" name="" id="gender" value={formData.gender} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="ihi">IHI:</label>
                <input type="text" name="" id="ihi" value={formData.ihi} onChange={handleFormData}/>
            </div>
            <div>
                <input type="submit" value="Save"/>
                <button onClick={cleanPatient}>Reset</button>
            </div>
        </form>
        </>
    )
} 
export default PatientForm