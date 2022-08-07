import axios from "axios";

// const dosehelpAPI = axios.create({
//     baseURL: 'https://dosehelp.herokuapp.com'
// })

// const dosehelpAPI = axios.create({
//     baseURL: 'http://localhost:4000'
// })
 
const dosehelpAPI = axios.create({
    baseURL: process.env.BACKEND_URL
})

dosehelpAPI.interceptors.request.use(req => {
    // send the token in the request
    const token = sessionStorage.getItem("token")
    // console.log(token)
    // Authorization -> Bearer token -> paste the token
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`
    }
    

    return req
})


export default dosehelpAPI