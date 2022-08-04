import { useParams } from "react-router-dom"
import { useState } from "react"
import PatientDetail from "./PatientDetails"
import PrescriptionDetail from "./PrescriptionDetail"
import { Button } from "antd"
import Paper from '@mui/material/Paper';
import { createDispense } from "../services/patientServices"
import Alert from '@mui/material/Alert'
const DispenseFormPatient = () => {
    const params = useParams()
    console.log(params)
    const userID =  sessionStorage.getItem("userID")
    const dispenseData = {prescription_id:params.pxID,user_id:userID}
    const [error, setError] = useState(null)
    const handleDispense = () =>{
        createDispense(dispenseData)
         .then(dispense =>{
            if(dispense.error){
            console.log("dispense.error", dispense.error)
            setError(dispense.error)
             }else{
                
             console.log(dispense)
             }
            })
   }
    
       
    return (
        <>
        {error && <Alert severity="error">{error}</Alert>}
        <PatientDetail/>
        <PrescriptionDetail></PrescriptionDetail>
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
        <Button onClick={()=>{handleDispense()}}>Confirm</Button>
        </Paper>
        </>
    )
} 
export default DispenseFormPatient