import * as React from 'react';
import { useState, useEffect} from 'react';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SensorOccupiedTwoToneIcon from '@mui/icons-material/SensorOccupiedTwoTone';


// Testing Redux: import Redux
import { useSelector, useDispatch } from 'react-redux';
// Import the functions that you will need:
import { increment,decrement } from '../features/exampleSlice'



function Signup() {
  // TO BE REMOVED TESTING REDUX 
  const count = useSelector((state) => state.counter.count)

// Username
  const [ username, setusername] = useState("")
  const handleusername = (event) => {
    // onChange, username will store its value
    setusername(event.target.value)
  }

  // Fullname 
  const [ fullname, setfullname] = useState("")
  const handlefullname = (event) => {
    // onChange, username will store its value
    setfullname(event.target.value)
  }

  // Password  
  const [password, setpassword] = useState("")
  const handlepassword = (event) => {
    setpassword(event.target.value)
  }

  // Email Address
  const [ email , setemail ] = useState("")
  const handlesetemail = (event) => {
    setemail(event.target.value)
  }

  // Submit 
  const [ submit , setsubmit ] = useState(1)
  const handlesetsubmit = () =>{
    setsubmit(submit+1)
  }

  const signup = () => {
    const result = {
      "login":  username,
      "password": password,
      "email": email,
      "fullname": fullname
    }
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result)
    }

    fetch("http://127.0.0.1:5000/signup/"+ username, options)
      .then(response=> response.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log('fetch aborted')
        }
        else {
          console.log(err)
        }
      })

  }
  

    return (
      <div style={{marginTop:"20px"}}>
        <MapsHomeWorkTwoToneIcon fontSize="large" />

        <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
          <Typography varaint="h5" gutterBottom color="secondary" sx={{display:'flex'}}>
            Sign Up Form 
          </Typography>
          {/* {username}
          {password}
          {email}
          {fullname} */}
        </Box>
        <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <TextField
              helperText="Please enter your username"
              id="demo-helper-text-misaligned"
              label="Username"
              onChange= {handleusername}
            />
          </Box>

          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <TextField
              helperText="Please enter your fullname"
              id="demo-helper-text-misaligned"
              label="Full Name"
              onChange= {handlefullname}
            />
          </Box>

          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <TextField
              helperText="Please enter a password"
              id="demo-helper-text-misaligned"
              label="Password"
              type="password"
              onChange = {handlepassword}
            />
          </Box>
          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <TextField
              helperText="Please enter your personal email"
              id="demo-helper-text-misaligned"
              label="Email Address"
              type="email"
              onChange = {handlesetemail}
            />
          </Box>
          <Box sx={{display: 'flex',alignItems: 'center','& > :not(style)': { m: 1 }, justifyContent: 'center'}}>
            <Button endIcon={<SensorOccupiedTwoToneIcon/>} variant="contained" color="secondary" onClick={handlesetsubmit}>Sign Up</Button>
          </Box>


      </div>
    );
  }
  
export default Signup;