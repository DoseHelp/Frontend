import dosehelpAPI from "../config/api";

export async function getDrugs (){
    const response = await dosehelpAPI.get('/drugs')
    return response.data
}
export async function deleteDrugs(id){
    await dosehelpAPI.delete(`/drugs/${id}`)
    //return response.data
}

export async function getDrugByID (id){
    const response = await dosehelpAPI.get(`/drugs/${id}`)
   
    return response.data
}

export async function getDoctors (){
    const response = await dosehelpAPI.get('/doctors')
    return response.data
}
export async function getDoctorByID(id){
    
    const response = await dosehelpAPI.get(`/doctors/${id}`)
   
    return response.data
}


export async function createDoctor(data){
    
    const response = await dosehelpAPI.post('/doctor', data)
    return response.data
}


export async function updateDoctor(data){
    
    const response = await dosehelpAPI.put(`/doctors/${data.id}`,data)
    return response.data
}