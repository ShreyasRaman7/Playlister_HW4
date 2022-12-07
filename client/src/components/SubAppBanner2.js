import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import {useEffect} from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import logo from './playlisterLogo.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import SortMenu from "./SortMenu.js";
import Button from '@mui/material/Button';


let searchByUserBool = false
export default function SubAppBanner2() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    
    
    
    
    const [query,setQuery] = useState('');

    //const [tempQuery,setTempQuery] = useState(''); //trying to set state for tempQuery
    
    
    
    function enterKey_Listener_for_Search(event){
        console.log('enterKey_Listener_for_Search has been entered')
        const tempQuery=query
        console.log("tempQuery: ", tempQuery)
        setQuery('');
        console.log("tempQuery: ", tempQuery)
        //setTempQuery(tempQuery);
        store.searchHandler(tempQuery)

        


    }

    function handleSearchChange(event){
        console.log("entered handleSearchChange");
        setQuery(event.target.value); 
        console.log("setQuery",event.target.value )
        if (event.key === 'Enter') { 
            console.log('do validate')
            enterKey_Listener_for_Search(event)
          }
        
        //to submit the query
        
    }
    
    function handleEnterKeyPress(e){
        if (e.key === "Enter"){
            console.log('enter key has been pressed')
            enterKey_Listener_for_Search(e)
        }
    }

    function searchByUser(){
        console.log('test')
        console.log("entered search by user")
        if(searchByUserBool){searchByUserBool=!searchByUserBool}
        else{searchByUserBool=true}
        console.log("searchByUserBool: ",searchByUserBool)
        store.hideModals()
        if(searchByUserBool){
            console.log("search By User")
            store.toggleSearchForUser()
        
        }
        
        
        
        
        

    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: 'white'  } }>
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: 'crimson' }} to='/'> <HomeOutlinedIcon/> </Link>
                        <Link style={{ textDecoration: 'none', color: 'crimson' }} to='/allLists'> <GroupsOutlinedIcon/> </Link>
                        
                        {/* <Link style={{ textDecoration: 'none', color: 'crimson' }} to='/'> <PersonOutlineOutlinedIcon/> </Link> */}
                        
                        <Button variant="contained"  onClick={searchByUser} > <PersonOutlineOutlinedIcon/></Button>
                            {  searchByUserBool && <Box component="span" sx={{ p: 1.5, backgroundColor:'salmon',border: '1px dashed grey' ,fontSize :'12px'}}> <b >Searching by User:</b> </Box>}
                        
                        <box backgroundColor="white">
                        <TextField
                        variant="outlined" 
                        backgroundColor="success"
                        color="warning"
                        focused 
                        id="outlined-name"
                        label=""
                        value={query}
                        onChange={handleSearchChange}
                        onKeyDown={(e)=>handleEnterKeyPress(e)}
                        />
                        </box>
                        

                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        
                    </Box>
                    <Box sx={{ backgroundColor: 'primary.dark'}}>  <SortMenu /> </Box>
                    
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}