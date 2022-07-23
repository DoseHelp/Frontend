 import { useGlobalState } from "../utils/stateContext"
import Patient from "./Patient"
const Patients = () => {
    const {store} = useGlobalState()
    const {patientList} = store
    const {loggedInUser} = store
    
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