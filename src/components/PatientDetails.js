import { Link, useNavigate, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Card, CardContent, Typography } from "@mui/material"
// import Patient from "./Patient"
import { Button } from "antd"


const PatientDetail = () => {
    const {store} = useGlobalState()
    const {patientList} = store
    const params = useParams()
    console.log(params)
    const navigate = useNavigate()
    const getPatient = (id) => {
        console.log(patientList)
        return patientList.find(p => p.id === parseInt(id))
    }
    
    const patient = getPatient(params.patientID)
    const handleClick = (e) => {
        console.log(e.currentTarget.value)
        navigate("/patients/"+e.currentTarget.value + "/edit")
        // dispatch({
        //     type: "getPatient",
        //     data: e.target.value
        // })
       
      };
   
    return (
        <>
            { patient ?
                <Card>
                    <CardContent>
                        <Typography variant='h5'>{patient.first_name}</Typography>
                        <Typography variant='p'>{patient.surname}</Typography>
                        <Typography variant='p'>{patient.dob}</Typography>
                        <Button variant="outlined" value = {patient.id} onClick={handleClick}>Edit</Button>
    
                    </CardContent>    
                </Card>
                :
                <>
                    <p>patinet not found</p>
                    <Link to="/patients">Go back to patients</Link>
                </>
            }
            
        </>
    )

}

export default PatientDetail