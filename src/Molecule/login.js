import * as React from 'react';
import { useState,useEffect } from 'react';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';

// Import React Router Dom 
import {useNavigate} from 'react-router-dom';
// Import Redux 
import { useSelector, useDispatch } from 'react-redux';
import { setlogin, setpassword, setemail, setfullname } from '../features/loginSlice'

function Login() {

    // UseNavigate 
    let navigate = useNavigate()
    const dispatch = useDispatch();


    const [ username, setusername] = useState("")
    const handleusername = (event) => {
      // onChange, username will store its value
      setusername(event.target.value)
    }
  
    const [ userpassword, setpasswordlocal] = useState("")
    const handlepassword = (event) => {
      setpasswordlocal(event.target.value)
    }

    const loginbutton = () => {
      const result = {"login": username, "password": userpassword}
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(result)
      }

      fetch("http://127.0.0.1:5000/login/"+ username, options)
      .then(response=> response.json())
      .then(data => {
        console.log(data)
        if (data.code === 200) {
          alert("Login Successful")
          // Store it inside global State ##################
          dispatch(setlogin(data.data.login))
          console.log(data.data.login)
          
          dispatch(setpassword(data.data.password))
          console.log(data.data.password)

          dispatch(setemail(data.data.email))
          console.log(data.data.email)

          dispatch(setfullname(data.data.fullname))
          console.log(data.data.fullname)

          navigate("/",{replace: true})
        }
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log('fetch aborted')
          alert(err)
        }
        else {
          console.log(err)
          var data_detail = err
          alert(err)
        }
      })
    }

    return (
      <div style={{marginTop:"20px"}}>
        <MapsHomeWorkTwoToneIcon fontSize="large" />
        <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
          <Typography varaint="h5" gutterBottom color="secondary" sx={{display:'flex'}}>
            Login to your account!
          </Typography>
        </Box>
        <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
          <TextField
            helperText="Please enter your username"
            id="demo-helper-text-misaligned"
            label="Username"
            onChange={handleusername}
          />
          </Box>
          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <TextField
              helperText="Please enter a password"
              id="demo-helper-text-misaligned"
              label="Password"
              type=""
              onChange={handlepassword}

            />
          </Box>
          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <Button endIcon={<ExitToAppTwoToneIcon/>} variant="contained" color='secondary' onClick={loginbutton}>Log In </Button>
          </Box>
      </div>
    );
  }
  
export default Login;