import axios from "axios";

const dosehelpAPI = axios.create({
    baseURL: 'https://dosehelp-api-staging.herokuapp.com'
})

export default dosehelpAPI