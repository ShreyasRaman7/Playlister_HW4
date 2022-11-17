import Box from '@mui/material/Box'
import { Link} from "react-router-dom"
import Button from '@mui/material/Button'
import logo from './playlisterLogo.png';
export default function SplashScreen() {
    const styleObj1 = {
        fontSize: 28,
        color: "#4a54f1",
        textAlign: "center",
        paddingTop: "100px",
    }
    const styleObj2 = {
        fontSize: 50,
        color: "Black",
        textAlign: "top",
        paddingTop: "60px",
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
            Welcome to Playlister                
            
            <p style={styleObj1}>A site where you can create, view, and search for the best song playlists compiled by the students of CSE 316!</p>
            
            <span></span>
            <img src={logo} alt="Logo" />

            <p style={styleObj2}>By Shreyas Raman</p>


            
        </div>
        
        
    )
}