/* eslint-disable */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {  getPatientByID, updatePatient } from "../services/patientServices"
import { useGlobalState } from "../utils/stateContext"

const PatientUpdate = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser}= store
    // const {patientData}=store
    const navigate = useNavigate()
    const params = useParams()
    
    const initialFormData = {
        id:"",
        first_name:"",
        surname:""	,
        dob:""	,
        address:""	,
        phone:""	,
        gender:""	,
        ihi:""
    }
    

    const [formData,setFormData]= useState(initialFormData)
    
    useEffect( () => {
        getPatientByID(params.patientID)  
        .then(formData => {
            setFormData(formData)
         
        })
        console.log("useEffect first")
        console.log(formData)
       
      }, []);
    
      

    const handleFormData = (e) =>{
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    // to add the patient to the list
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log("formData")
        console.log(formData)
        updatePatientData(formData)
        cleanPatient()
    }
    const updatePatientData = (data)=>{
        updatePatient (data)
        .then(patient =>{
            dispatch({
                type: "updatePatient",
                data: patient
            })
            navigate(`/patients/${patient.id}`)
        })
        .catch(e => { console.log(e) })
    }
    //to clean the form
    const cleanPatient= () =>{
        setFormData(initialFormData)
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3>{loggedInUser}</h3>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="" id="first_name" value={formData.first_name} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="surname">Surname:</label>
                <input type="text" name="" id="surname" value={formData.surname} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="dob">Date Of Birth:</label>
                <input type="date"   name="" id="dob" value={formatDate(formData.dob)} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="address">Address:</label>
                <input type="address" name="" id="address" style={{width :'50%'}} value={formData.address} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="" id="phone" value={formData.phone} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <input type="text" name="" id="gender" value={formData.gender} onChange={handleFormData}/>
            </div>
            <div>
                <label htmlFor="ihi">IHI:</label>
                <input type="text" name="" id="ihi" value={formData.ihi} onChange={handleFormData}/>
            </div>
            <div>
                <input type="submit" value="Save"/>
                <button onClick={cleanPatient}>Reset</button>
            </div>
        </form>
        </>
    )
} 
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
export default PatientUpdate