 import { useGlobalState } from "../utils/stateContext"
 import { setPatientsList } from "../services/authServices"
import Patient from "./Patient"
import { getPatients } from "../services/patientServices"
import { useLocation } from "react-router-dom"
import { useEffect} from 'react'


const Patients = () => {
    const {store,dispatch} = useGlobalState()
    console.log(store)
    const {loggedInUser} = store
    const {patientList} =store
    const location = useLocation()
    
    useEffect(
      displayPatients(location, dispatch) 
      , 
      []
    ) 
    useEffect(
      displayPatients(location, dispatch)
      , 
      [location] 
    ) 
    
    return (
        
        <>
        <h1>{loggedInUser}</h1>
        {patientList.map(patient =>
            
            <Patient key= {patient.id} patient={patient}/>
        
            )}
        
        </>
    )
} 
export default Patients


const displayPatients = (location, dispatch, setError) =>{
    return () => {
      if (location.pathname === "/patients") {
        getPatients()
          .then(patients => {
            // console.log("all messages")
            dispatch({
              type: "setPatientsList",
              data: patients
            })
          })
          .catch(e => { console.log(e) })
      }
  
    }
}