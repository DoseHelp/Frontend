export const reducer = (state, action) => {
    console.log("STATE:")
    console.log(state)
    console.log(action)

    switch(action.type){
        case "cleanState": {
            
            return {
                patientList: [],
                loggedInUser: ""
            
            }
           
        }
        case "setPatientsList": {
            
            return {
                ...state,
                patientList: action.data
            }
        }
        case "addPatient": {
            //receives a patinet and adds it to the list
            return {
                ...state,
                patientList: [action.data, ...state.patientList]
            }
        }
        case "setLoggedInUser": {
            //updates the loggedInUser value
            return {
                ...state,
                loggedInUser: action.data
            }
            
        }
        case "setUserID": {
            //updates the userId value
            return {
                ...state,
                userID: action.data
            }
            
        }
        case "setPrescriptionID": {
            return{
                ...state,
                prescriptionID: action.data
            }
        }
        
        case "setAnchorElNav": {
            return{
                ...state,
                anchorElNav: null
            }
        }
        case "setAnchorElUser": {
            return{
                ...state,
                anchorElUser: null
            }
        }
        
        case "setToken": {
            //updates the token value
            return {
                ...state,
                token: action.data
            }
        }
        default: return state
    }

}

