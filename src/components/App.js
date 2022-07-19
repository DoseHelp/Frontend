import React,{useState,useEffect} from 'react'
import Navigation from './Navigation'
import Patients from './Patients'
import DispenseForm from './DispenseForm'
import Manage from './Manage'
import Reports from './Reports'
import Help from './Help'
import Landing from './Landing'
import LoginForm from './LoginForm'
import intialPatientList from '../data/patient-list.json'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
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
  const activeUser = (username) =>{
  setLoggedInUser(username)
  }
  const addPatient = (patient) => {
    patient.id = patientList[patientList.length -1].id +1 
    setPatientList((patientList)=> [...patientList,patient])
}

  return (
  <div>
    <h1>DoseHelp</h1>
    <Navigation loggedInUser={loggedInUser} activeUser={activeUser}/>
    {/* <Patients patientList ={patientList}/>
    <DispenseForm/>
    <Manage loggedInUser={loggedInUser} addPatient={addPatient}/>
    <Reports/>
    <Help/>
    {!loggedInUser && <LoginForm activeUser={activeUser}/>} */}
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='help' element={<Help/>}></Route>
        <Route path = '*' element={<NotFound/>}/>
      </Routes>
    </Router>

  </div>
  )
}

export default App
