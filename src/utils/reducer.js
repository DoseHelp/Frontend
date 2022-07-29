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

        
        case "updatePatient": {
            //receives a patinet and update it to the list
            let updatedList= state.patientList.find(patient => patient.id === parseInt(action.data.id))
            console.log(updatedList)
            return {
                ...state,
                messageList: updatedList
            }
        }
        case "setLoggedInUser": {
            //updates the loggedInUser value
            return {
                ...state,
                loggedInUser: action.data
            }
            
        }
        case "setPatientData": {
            //updates the loggedInUser value
            return {
                ...state,
                patientData: action.data
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

