import dosehelpAPI from "../config/api";

export async function getPatient (){
    const response = await dosehelpAPI.get('/patients')
    return response.data
}