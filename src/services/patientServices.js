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
    console.log("response")
    console.log(response.data)
    return response.data
}
export async function createPatient(data){
    const response = await dosehelpAPI.post('/patients', data)
    return response.data
}



