import { useState } from "react"
const PatientForm = ({loggedInUser,patient,addPatient}) => {
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
    const handleFormData = (e) =>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    // to add the patient to the list
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log(formData)
        addPatient(formData)
        cleanPatient()
    }
    //to clean the form
    const cleanPatient= () =>{
        setFormData(initialFormData)
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            
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
                <input type="date" name="" id="dob" value={formData.dob} onChange={handleFormData}/>
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
export default PatientForm