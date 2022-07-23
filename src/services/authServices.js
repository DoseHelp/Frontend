import dosehelpAPI from "../config/api";


export async function signUp(data){
    const response = await dosehelpAPI.post('/auth/signup', data)
    return response.data
}

export async function signIn(data){
    const response = await dosehelpAPI.post('/auth/signin', data)
    return response.data
}