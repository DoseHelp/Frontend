
import { useGlobalState } from '../utils/stateContext'
import Patient from './Patient'

const Patients = () => {
    const {store}= useGlobalState()
    const {patientList} = store
    console.log (store)
    
    return (
        <>
          {patientList.length ?
            <>
              {patientList.map(patient => 
                <Patient key={patient.id} patient={patient}/>
              )} 
            </> 
            :
            <p>List of patient is empty</p>
          
          } 
            
        </>
    )

}

export default Patients


