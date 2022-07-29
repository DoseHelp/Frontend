/* eslint-disable */

import { useGlobalState } from '../utils/stateContext'
import Patient from './Patient'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import 'antd/dist/antd.min.css';
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
    const {store}= useGlobalState()
    const {patientList} = store
    console.log ("store")
    
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'first_name', headerName: 'First name', width: 130 },
      { field: 'surname', headerName: 'Last name', width: 130 },
      {
        field: 'dob',
        headerName: 'DoB',
        type: 'number',
        width: 90,
      },
      // {
      //   field: 'fullName',
      //   headerName: 'Full name',
      //   description: 'This column has a value getter and is not sortable.',
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      // },
    ];
    const navigate = useNavigate()
     const rows = patientList;
     const handleCellClick = (e) => {
      console.log(e.row.id)
      navigate("/patients/"+e.row.id)
      // dispatch({
      //     type: "getPatient",
      //     data: e.target.value
      // })
     
    };
    return (
        // <>
        //   {patientList.length ?
        //     <>
        //       {patientList.map(patient => 
        //         <Patient key={patient.id} patient={patient}/>
        //       )} 
        //     </> 
        //     :
        //     <p>List of patient is empty</p>
          
        //   } 
            
        // </>
        <>
         
          <div style={{ height: 400, width: '100%' }}>
           { rows.length > 0 ?
              <DataGrid
                rows= {rows} 
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={handleCellClick}
                // checkboxSelection
              />
            :
           
          <DataGrid
          components={<Empty image={Empty.PRESENTED_IMAGE_DEFAULT}/>}
            rows={[]}
            columns={columns}
          />
          
        }
        </div>
        
        </>
   
    )
}


export default Patients

