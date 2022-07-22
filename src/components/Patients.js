 import Patient from "./Patient"
const Patients = ({patientList,loggedInUser}) => {
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