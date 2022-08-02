///*eslint-disable*/
import {  useState } from "react"
//import {  useLocation } from "react-router-dom"
import { getPrescriptionByPID } from "../services/patientServices"
import { useGlobalState } from '../utils/stateContext'
import Alert from '@mui/material/Alert'
import { useNavigate } from "react-router-dom"
const PatientSelector = () =>{
    const {store}= useGlobalState()
    const {patientList} = store
    const navigate = useNavigate()
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
    
    const initialPrescriptionList=[]
    //const[prescription,setPresption]=useState(initialPrescription)
    const [prescriptionsList,setPrescriptionsList]=useState(initialPrescriptionList)
    const [patientData,setPatientData]=useState(initialPatientData)
    const handlePrescriptionClick=(pxID)=>
    {
        navigate(`/dispense/${patientData.id}/${pxID}`)
    }
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
                return <li key={px.id}>{px.issue_date}<button onClick={handlePrescriptionClick(px.id)}>Dispense</button></li>
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

