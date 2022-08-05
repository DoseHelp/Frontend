 // /* eslint-disable */
import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Alert from '@mui/material/Alert';
import { CardActionArea, CardContent, Typography } from "@mui/material"
import { Card } from "@material-ui/core";
import { Pages } from "@mui/icons-material";
import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import {  getPrescriptionByPID } from "../services/patientServices";
import {getDrugByID,getDoctorByID} from "../services/manageServices"; 


const PrescriptionDetail = props => {
   
    const params = useParams()
    console.log(params)
    const [prescriptionData,setPrescriptionData]= useState([])
    
    const [error, setError] = useState(null)
    const {store, dispatch} = useGlobalState()
    const [flagClick, setflagClick] = useState(false);

   
   const handlePrescriptionID =(px_id,drug_cost)=>{
        dispatch({
            type: "setPrescriptionID",
            data: px_id
        })
        props.passPrice(drug_cost)
        setflagClick(!flagClick);
   }
    useEffect( () => {
        // get the details of prescription
        getPrescriptionByPID(params.patientID)  
        .then(prescriptionData => {
            if(prescriptionData.error){
                console.log("prescriptionData.error", prescriptionData.error)
                setError(prescriptionData.error)
            }else{
            console.log(prescriptionData)
            setPrescriptionData(prescriptionData)
            }
        })
       
       //get details of a doctor
       
      }, []);
    

 
   
    return (
        <>
        {error && <Alert severity="error">{error}</Alert>}
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}}>
        
        {prescriptionData.length ? <>
        {
            prescriptionData.map(px =>
            <div key = {px.id}>
           
             
             <div id={px.id} name={px.id} value={px.id} onClick ={()=>{ handlePrescriptionID(px.id,px.drug.cost)} } style={flagClick ? { backgroundColor: "lightgray" }: { backgroundColor: "gray" }} > 
                 
                     <Typography>Expiry Date:{px.expiry_date} </Typography>
                     <Typography>Drug: {px.drug_id}</Typography>
                     <Typography> Drug name : {px.drug.name} </Typography>
                     <Typography>costs: ${px.drug.cost} </Typography>
                     <Typography>Doctor: {px.doctor.first_name}</Typography>
                 
              </div>
       
             </div>)
             
        }
        </> 
            :
            <>
            <p>No Prescription Details for this patient</p>
            </> }
        
        </Paper>
        </>
    )
       
       
    
       
}







export default PrescriptionDetail