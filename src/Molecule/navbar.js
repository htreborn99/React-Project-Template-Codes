import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';
// Import Redux-Toolkit
import { useSelector, useDispatch } from 'react-redux';
import { setlogin, setpassword, setemail, setfullname } from '../features/loginSlice'


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';


const Navbar = () => {
    const dispatch = useDispatch();
    const login_data = useSelector((state) => state.login.login)

    const signout = () =>{
        dispatch(setlogin(""))
        dispatch(setemail(""))
        dispatch(setfullname(""))
        dispatch(setpassword(""))
    }

    if (login_data == ""){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar >
                        <Box display="flex">
                            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                <Button sx={{color:"white"}} variant="outlined" startIcon={<HomeIcon/>} > 
                                    Home 
                                </Button>
                            </NavLink>
                            <Button sx={{color:"white"}} variant="outlined" > 
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/profile"> Profile </NavLink>
                            </Button>
                        </Box>

                        {/* Flush Right */}
                        <Box justifyContent="flex-end"  display="flex">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white"}} variant="outlined" >  
                                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signup"> Sign Up </NavLink>
                                </Button>
                            {/* </Link> */}
                        </Box>

                        <Box justifyContent="flex-end"  display="flex">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white"}} variant="outlined" >  
                                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login"> Login </NavLink>
                                </Button>
                            {/* </Link> */}
                        </Box>

                    </Toolbar>
                </AppBar>
            </div>
            )
        }
    else{
        return(
            <div>
                <AppBar position="static">
                    <Toolbar >
                        <Box display="flex">
                            <Button sx={{color:"white"}} variant="outlined" disableFocusRipple >Welcome Back, {login_data}</Button>
                            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                <Button sx={{color:"white"}} variant="outlined" startIcon={<HomeIcon/>} > 
                                    Home 
                                </Button>
                            </NavLink>
                            <Button sx={{color:"white"}} variant="outlined" > 
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/profile"> Profile </NavLink>
                            </Button>

                            <Button sx={{color:"white"}} variant="outlined" onClick={signout} > 
                                Sign Out
                            </Button>
                        </Box>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar