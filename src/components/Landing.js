import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PersonIcon from '@mui/icons-material/Person';


const Landing = () => {
    // const handleOpenUserMenu=()=>{

    // }
    return (
        
               
        <>
             <CssBaseline />
                <Container maxWidth="sm"  align="center"  >
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', marginTop: 20 }} >
                    
                    <IconButton  href="/patients"  sx={{flexDirection: 'column' }}>
                        <PersonIcon  variant="square" alt="" src="/static/images/avatar/2.jpg" sx={{ width: 170, height: 170}}/>
                        Patients
                    </IconButton>
                    
                    <IconButton href="/reports" sx={{flexDirection: 'column' }}  >
                        <AssignmentIcon sx={{ width: 170, height: 170}}/>
                        Reports
                    </IconButton>
                    <IconButton href="/drugs" sx={{flexDirection: 'column' }} >
                        <VaccinesIcon sx={{ width: 170, height: 170}} />
                        Drugs 
                    </IconButton>
                    </Typography>
            </Container>
            
               
           
            
        </>
    )
} 
export default Landing