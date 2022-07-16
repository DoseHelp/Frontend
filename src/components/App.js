import React,{useState} from 'react'
import Navigation from './Navigation'
import Patients from './Patients'
import DispenseForm from './DispenseForm'
import Manage from './Manage'
import Reports from './Reports'
import Help from './Help'
import LoginForm from './LoginForm'
const App = () => {
  //to have the user allover the app
  const [loggedInUser, setLoggedInUser] = useState("")
const activeUser = (username) =>{
  setLoggedInUser(username)
}
  return (
  <div>
    <h1>DoseHelp</h1>
    <Navigation loggedInUser={loggedInUser} activeUser={activeUser}/>
    <Patients/>
    <DispenseForm/>
    <Manage/>
    <Reports/>
    <Help/>
    {!loggedInUser && <LoginForm activeUser={activeUser}/>}


  </div>
  )
}

export default App
