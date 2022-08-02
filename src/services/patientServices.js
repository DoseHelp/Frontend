import dosehelpAPI from "../config/api";

export async function getPatients (){
    const response = await dosehelpAPI.get('/patients')
    return response.data
}
export async function deletePatient(id){
    await dosehelpAPI.delete(`/patients/${id}`)
    //return response.data
}
export async function updatePatient(data){
    console.log("patient")
    console.log(data)
    const response = await dosehelpAPI.put(`/patients/${data.id}`,data)
    return response.data
}
export async function getPatientByID (id){
    const response = await dosehelpAPI.get(`/patients/${id}`)
   
    return response.data
}


export async function getPrescription(id){
    
    const response = await dosehelpAPI.get(`/prescriptions/${id}`)
   
    return response.data
}

export async function getPrescriptionByPID (id){
    
    const response = await dosehelpAPI.get(`/patients/${id}/prescriptions`)
    console.log(`/patients/${id}/prescriptions`)
    return response.data
}
export async function createPatient(data){
    const response = await dosehelpAPI.post('/patients', data)
    return response.data
}
export async function createDispense(data){
    
    const response = await dosehelpAPI.post('/dispenses', data)
    return response.data
}


