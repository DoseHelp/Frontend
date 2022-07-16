 import Patient from "./Patient"
const Patients = ({patientList}) => {
    return (
        <>
        {patientList.map(patient =>
            
            <Patient key= {patient.id} patient={patient}/>
        
            )}
        
        </>
    )
} 
export default Patients