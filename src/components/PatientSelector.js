
import { useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { getPrescriptionByPID } from "../services/patientServices"
import { useGlobalState } from '../utils/stateContext'
import Alert from '@mui/material/Alert'
const PatientSelector = () =>{
    const {store,dispatch}= useGlobalState()
    const {patientList} = store
    const location = useLocation()
    const [error, setError] = useState(null)
   
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
    const initialPrescription={
        id:"",
        issue_date:"",
        expiry_date:"",
        takeaway:"",
        doctor_id:"",
        patient_id:"",
        drug_id:"",
        prescription_valid:""
    }
    const initialPrescriptionList=[]
    //const[prescription,setPresption]=useState(initialPrescription)
    const [prescriptionsList,setPrescriptionsList]=useState(initialPrescriptionList)
    const [patientData,setPatientData]=useState(initialPatientData)
    
    const handlePatient=(e)=>{
        let selectedPatient = patientList.filter((patientData)=>{if(patientData.id == e.target.value){return patientData}});
        console.log(selectedPatient[0])
        setPatientData(selectedPatient[0])
        getPrescriptionByPID(selectedPatient[0].id)  
        .then(responseData => {

            setPrescriptionsList(responseData)
        })
        
    }
     // const RenderPatientDetails =()=>{
    //     let resultPatient;
    //     patient = initialPatientData ? (resultPatient = initialPatientData ) : (resultPatient = patient)
    //    return patient 
    // }
   
    return(
        <>
          Select Patient: 
          {error && <Alert severity="error">{error}</Alert>}
          { patientData ? 
          <><select value={patientData.id} onChange={(e)=>{handlePatient(e)}}>
                {patientList.map((p) =>(
                <option key={p.id} value={p.id}>{p.first_name + "  "+p.surname}</option>
              )  )}
            </select>
           
            <h1>First Name : {patientData.first_name}   Surname:{patientData.surname}</h1>
            <h1>Date of birth{patientData.dob}</h1>
            <h3>Prescription</h3>
            <ul>
            {prescriptionsList.map(px => {
                return <li key={px.id}>{px.issue_date}</li>
            })}
            </ul>
            {/* <select value={prescription} onChange={(e)=>{handlePatient(e)}}>
                {prescriptionsList.map((px) =>(
                <option key={px.id} value={px.id}>{px.id }</option>
              )  )}
            </select> */}
            </>
            :
            <h2>No data to show</h2>}
            


            
            
       
        
        </>
    )
}

export default PatientSelector

