import Box from '@mui/material/Box'
import { Link} from "react-router-dom"
import Button from '@mui/material/Button'
import logo from './playlisterLogo.png';
export default function SplashScreen() {
    const styleObj1 = {
        fontSize: 28,
        color: "white",
        textAlign: "center",
        paddingTop: "080px",
    }
    const styleObj2 = {
        fontSize: 50,
        color: "Black",
        textAlign: "top",
        paddingTop: "10px",
        margintop:0
    }
    const styleObj3 = {
        fontSize: 75,
        color: "gold",
        textAlign: "top",
        paddingTop: "100px",
        margintop:10
    }
    return (
        <div id="splash-screen">
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Box sx={{ padding: 0 }}>
                    <Link to='/login/'>
                        <Button variant="contained" sx={{ fontSize: 18, backgroundColor: 'periwinkle' }}>
                            Login
                        </Button>
                    </Link>

                </Box>


                <Box>
                    <Link to='/allLists/' >
                        <Button variant="contained" sx={{ fontSize: 18, backgroundColor: 'periwinkle' }}>
                            Continue as Guest
                        </Button>
                    </Link>
                </Box>


                <Box>
                    <Link to='/register/'>
                        <Button variant="contained" sx={{ fontSize: 18, backgroundColor: 'periwinkle' }}>
                            Create Account
                        </Button>
                    </Link>
                </Box>
            </Box>
                  
            <span  style={styleObj3}>Welcome to Playlister</span>          
            
            <p style={styleObj1}>A site where you can create, view, and search for the best song playlists compiled by the students of CSE 316!</p>
            
           
            <img src={logo} alt="Logo"  height={100}/>

            <p style={styleObj2} >By Shreyas Raman</p>


            
        </div>
        
        
    )
}