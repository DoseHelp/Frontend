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
        default: return state
    }

}

