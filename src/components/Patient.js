const Patient = ({patient}) => {
    
    return (
        
        <>
        {
            [patient.id,patient.first_name,patient.surname]
        }
            {/* <p>{patient.id}</p>
            <p>{patient.first_name}</p>
            <p>{patient.surname}</p>   */}
        </>
    )
} 
export default Patient