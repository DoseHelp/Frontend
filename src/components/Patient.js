const Patient = ({patient}) => {
    
    return (
        
        <>
            <p>{patient.id}</p>
            <p>{patient.first_name}</p>
            <p>{patient.surname}</p>  
        </>
    )
} 
export default Patient