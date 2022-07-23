import PatientForm from "./PatientForm"

const Manage = ({loggedInUser,addPatient}) => {
    return (
        <>
        <PatientForm loggedInUser={loggedInUser} addPatient={addPatient}/>
        </>
    )
} 
export default Manage