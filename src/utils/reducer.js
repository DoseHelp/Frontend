export const reducer = (state, action) => {
    console.log(state)
    console.log(action)

    switch(action.type){
        case "cleanState": {
            //State goes back to default values
            return {
                patientList: [],
                loggedInUser: ""
            }
        }
        case "setPatientsList": {
            //populate the messageList Array with the inital values
            return {
                ...state,
                patientList: action.data
            }
        }
        case "addPatient": {
            //receives a message and adds it to the list
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

