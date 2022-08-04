import { Link, useNavigate, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Typography } from "@mui/material"
// import Patient from "./Patient"
import { Button } from "antd"
import * as React from 'react';
//import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
 
// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });


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
       
      };
      const handleClickPrescription = (e) => {
     
        navigate(`/dispense/${e.currentTarget.value}` )
       
      };
   
    return (
        <><p></p>
            { patient ?
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
                    <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 170, height: 170 }}>
                        <Avatar  src="/broken-image.jpg" sx={{ width: 170, height: 170 }}  />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                            <b>First Name:</b> {patient.first_name} 
                            
                            <b> Surname:</b>{patient.surname}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            {patient.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            DoB: {patient.dob}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Phone: {patient.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Gender: {patient.gender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            IHI: {patient.ihi}
                            </Typography>
                            
                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                            <Button variant="contained" value = {patient.id} onClick={handleClick}>Edit</Button>
                            <Button variant="contained" value = {patient.id} onClick={handleClickPrescription}>Prescription</Button>
                            
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid item>
                        <Typography variant="subtitle1" component="div">
                            $ { patient.credit}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                    </Paper>



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