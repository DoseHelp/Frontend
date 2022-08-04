  /* eslint-disable */
import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Alert from '@mui/material/Alert';
import { Typography } from "@mui/material"


import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { getPrescription, getPrescriptionByPID } from "../services/patientServices";
 


const PrescriptionDetail = () => {
   
    const params = useParams()
    console.log(params)
    const [prescriptionData,setPrescriptionData]= useState([])
    const [error, setError] = useState(null)
    const {store, dispatch} = useGlobalState()
   
   const handlePrescriptionID =(e)=>{
        dispatch({
            type: "setPrescriptionID",
            data: e.target.value
        })
   }
    useEffect( () => {
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
             <label htmlFor={px.id}> Expiry Date:{px.expiry_date} Drug: {px.drug_id} Doctor: {px.doctor_id}</label> 
             <input  type="radio" id={px.id} name={px.id} value={px.id} onChange ={handlePrescriptionID}/> <br></br>
             </div> )
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