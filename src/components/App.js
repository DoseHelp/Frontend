import React, {useEffect, useReducer}from 'react'
import Navigation from './Navigation'
import Patients from './Patients'
import PatientForm from './PatientForm'
import DispenseForm from './DispenseForm'
import Manage from './Manage'
import Reports from './Reports'
import Help from './Help'
import Landing from './Landing'
import LoginForm from './LoginForm'
import intialPatientList from '../data/patient-list.json'
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import NotFound from './NotFound'
import { reducer } from '../utils/reducer'
import { StateContext } from '../utils/stateContext'

const App = () => {
  //to have the user allover the app
  const initialState = {
    patientList: [],
    loggedInUser: localStorage.getItem("loggedInUser")
  }
  const [store, dispatch] = useReducer(reducer, initialState)
  const {patientList, loggedInUser} = store
  const activateUser = (username) =>{
    dispatch({
      type: "setLoggedInUser",
      data: username 
    })
    }
  //to get the data from api async
  
  
  const addPatient = (first_name) => {
    
    const patient = {
      id: patientList[0].id + 1, //next Id
      first_name: first_name,
      user: loggedInUser, 
    }
    dispatch({
      type: "addPatient",
      data: patient
    })
   
}
useEffect(
  ()=>{
    const loggedInUser = localStorage.getItem("loggedInUser")
    console.log(loggedInUser)
    //fetch
    dispatch({
      type: "setPatientList",
      data: intialPatientList
    })
  }
  ,[])



  
  return (
    
  <div>
    <h1>DoseHelp</h1>
   
    {/* <Patients patientList ={patientList}/>
    <DispenseForm/>
    <Manage loggedInUser={loggedInUser} addPatient={addPatient}/>
    <Reports/>
    <Help/>
    {!loggedInUser && <LoginForm activeUser={activeUser}/>} */}
    <StateContext.Provider value={{store, dispatch}}>
      <Router>
        <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/> 
            <Routes>
              <Route path="/" element={!loggedInUser && <Navigate to="login"/>} />
              <Route path="patients">
                <Route index element={<Patients patientList={patientList}/>}/>
                <Route path="new" element={
                  loggedInUser?
                    <PatientForm loggedInUser={loggedInUser} addPatient={addPatient}/>
                  :
                    <Navigate to="login" />
                  } />
                </Route>
              <Route path="help" element={<Help />} />
              <Route path="dispense" element={<DispenseForm />} />
              <Route path="manage" element={<Manage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="landing" element={<Landing />} />
              
              
              <Route path="login" element={<LoginForm activateUser={activateUser}/>} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
      </Router>
    </StateContext.Provider> 
    

  </div>
  )
}

export default App
