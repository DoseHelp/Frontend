/*eslint-disable*/
import {  useState } from "react"
//import {  useLocation } from "react-router-dom"

import { useGlobalState } from '../utils/stateContext'
import Alert from '@mui/material/Alert'
import Prescriptions from "./Prescriptions"
const PatientSelector = () =>{
    const {store}= useGlobalState()
    const {patientList} = store
  
    // const location = useLocation()
    const [error] = useState(null)
   
    const initialPatientData = {
        id:"",
        first_name:"",
        surname:""	,
        dob:""	,
        address:""	,
        phone:""	,
        gender:""	,
        ihi:"",
        updated_at:"",
        credit: ""
    }
    
    
    //const[prescription,setPresption]=useState(initialPrescription)
    const [patientData,setPatientData]=useState(initialPatientData)
    const handlePatient=(e)=>{
        let selectedPatient = patientList.filter((patientData)=>{if(patientData.id == e.target.value){return patientData}});
        console.log(selectedPatient)
        if (selectedPatient[0]) 
        { 
            setPatientData(selectedPatient[0]) 
        }
        else
        {
            setPatientData(initialPatientData) 
        }
        
    }
    
   
    return(
        <>
          Select Patient: 
          {error && <Alert severity="error">{error}</Alert>}
          { patientData ? 
          <>
            <select value={patientData.id} onChange={(e)=>{handlePatient(e)}}>
                   <option key = "0" value= "0">Select Patient</option> 
                    {patientList.map((p) =>(
                    <option key={p.id} value={p.id}>{p.first_name + "  "+p.surname}</option>
                )  )}
                </select>
            
                <h1>First Name : {patientData.first_name}   Surname:{patientData.surname}</h1>
                <h1>Date of birth{patientData.dob}</h1>
                <h3>Prescription</h3>
                <Prescriptions patientID={patientData.id}/>
            </>
            :
            <h2>No data to show</h2>}
            


            
            
       
        
        </>
    )
}

export default PatientSelector

