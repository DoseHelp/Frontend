import React,{useState,useEffect} from 'react'
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


const App = () => {
  //to have the user allover the app
  const [loggedInUser, setLoggedInUser] = useState("")
  const [patientList, setPatientList] = useState([])
  
  //to get the data from api async
  useEffect(
    () =>{
      //fetch from api
      setPatientList(intialPatientList)
    }
    ,[]
  )
  const activateUser = (username) =>{
  setLoggedInUser(username)
  }
  const addPatient = (patient) => {
    patient.id = patientList[patientList.length -1].id +1 
    setPatientList((patientList)=> [...patientList,patient])
}

  return (
  <div>
    <h1>DoseHelp</h1>
   
    {/* <Patients patientList ={patientList}/>
    <DispenseForm/>
    <Manage loggedInUser={loggedInUser} addPatient={addPatient}/>
    <Reports/>
    <Help/>
    {!loggedInUser && <LoginForm activeUser={activeUser}/>} */}
    <Router>
    {/* <Navigation loggedInUser={loggedInUser} activateUser={activateUser}/> */}
    
      <Routes>
        <Route path ="/" element={<Navigate to="/"/>}/>
        <Route path='/' element={!loggedInUser && <LoginForm activateUser={activateUser}/>}></Route>
        <Route path ="/login" element={<Navigate to="/"/>}></Route>
        <Route path="/home" element={
          loggedInUser?
            <Landing loggedInUser={loggedInUser}/>
            :
            <Navigate to="/"/>
          }></Route>
           
        <Route path='help' element={<Help/>}></Route>
        <Route path='patients' element={
          loggedInUser ?
          <Patients patientList ={patientList}/>
          :
          <Navigate to ="/"/>
        }></Route>
        <Route path='patients/new' element={
          loggedInUser ?
          <PatientForm addPatient={addPatient}/>
          :
          <Navigate to ="/"/>
          }></Route>
        <Route path='dispense' element={
          loggedInUser?
          <DispenseForm/>
          :
          <Navigate to="/"/>
          }></Route>
        <Route path = 'reports' element={
          loggedInUser?
          <Reports/>
          :
          <Navigate to="/"/>
          }></Route>
        <Route path = '*' element={<NotFound/>}/>
      </Routes>
    </Router>

  </div>
  )
}

export default App
