import { useState,useEffect } from "react"
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
import { getPrescription } from "../services/patientServices";
 
// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });


const PrescriptionDetail = () => {
   
    const params = useParams()
    console.log(params)
    const [prescriptionData,setPrescriptionData]= useState(null)
    const [error, setError] = useState(null)
   
    useEffect( () => {
        getPrescription(params.pxID)  
        .then(prescriptionData => {
            if(prescriptionData.error){
                console.log("prescriptionData.error", prescriptionData.error)
                setError(prescriptionData.error)
            }else{
            setPrescriptionData(prescriptionData)
            }
        })
       
       
      }, []);
    

 
   
    return (
        <><p></p>
            { prescriptionData ?
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
                        
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                            <b>Issue Date:</b> {prescriptionData.issue_date} 
                            
                            <b> Expiry Date:</b>{prescriptionData.expiry_date}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <b>TakeAway</b>
                            {String(prescriptionData.takeaway)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Doctor: {prescriptionData.doctor_id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Drug: {prescriptionData.drug_id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Valid: {String(prescriptionData.prescription_valid)}
                            </Typography>
                           
                            
                        </Grid>
                        
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







export default PrescriptionDetail