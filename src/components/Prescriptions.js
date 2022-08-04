import {  useEffect, useState } from "react"
import { getPrescriptionByPID } from "../services/patientServices"
import { useNavigate } from "react-router-dom"

const Prescriptions = (patientID) => {
    console.log(patientID)
    const navigate = useNavigate()
    const initialPrescriptionList=[]
    const [prescriptionsList,setPrescriptionsList]=useState(initialPrescriptionList)
   
    const handlePrescriptionClick=(pxID)=>
    {
        navigate(`/dispense/${patientID.patientID}/${pxID}`)
    }
  
    useEffect(() => {
        if (patientID.patientID){
            getPrescriptionByPID(patientID.patientID)  
            .then(responseData => {

            setPrescriptionsList(responseData)
            })
        } 
      }, [patientID]);
    

    return (
        <>
       
         <ul>
            {prescriptionsList.map(px => {
                return <li key={px.id}>{px.issue_date}  <button onClick={()=>{handlePrescriptionClick(px.id)}}>Dispense</button></li>
            })}
            </ul>
        </>
    )
} 
export default Prescriptions