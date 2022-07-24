import dosehelpAPI from "../config/api";

export async function getPatients (){
    const response = await dosehelpAPI.get('/patients')
    return response.data
}
export async function createPatient(data){
    const response = await dosehelpAPI.post('/patients', data)
    return response.data
}



