import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PatientDetail from "./PatientDetails"
import PrescriptionDetail from "./PrescriptionDetail"
import { Button } from "antd"
import Paper from '@mui/material/Paper';
import { createDispense } from "../services/patientServices"
import { useGlobalState } from "../utils/stateContext"
import {updatePatient} from "../services/patientServices"

const DispenseFormPatient = () => {
    const params = useParams()
    
    
    const {store} = useGlobalState()
    const {patientData} = store
    const {prescriptionID} = store
    const userID =  sessionStorage.getItem("userID")
    const dispenseData = {prescription_id:prescriptionID,user_id:userID}
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    console.log(`Patient Data in dispese form patient${patientData}`)
    const [priceData, setPriceData] = useState(0);
    const passPrice= (data)=>{
        setPriceData(data)
    }
    const handleDispense = () =>{
        
        createDispense(dispenseData)
         .then(dispense =>{
            if(dispense.error){
            console.log("dispense.error", dispense.error)
            setError(dispense.error)
             }else{
                patientData.credit -= priceData
                updatePatient(patientData)
                
                navigate(`/patients/${patientData.id}`)
             }
            })
   }
    
       
    return (
        <>
         
        <PatientDetail/>
        <PrescriptionDetail passPrice={passPrice}></PrescriptionDetail>
        <Paper
                    sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                    >
        <Button onClick={handleDispense}>Confirm</Button>
        </Paper>
        </>
    )
} 
export default DispenseFormPatient