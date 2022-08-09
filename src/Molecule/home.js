import * as React from 'react';
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
import {useState,useEffect} from 'react';

// import Redux
import { useSelector, useDispatch } from 'react-redux';
// Import the functions that you will need:
import { increment,decrement,reset,incrementByAmount } from '../features/exampleSlice'
// import { setlogindetails } from '../features/loginSlice'

function Home() {

  // Using the global variable here:
  const count = useSelector((state) => state.counter.count)
  console.log(count)

  const dispatch = useDispatch();

  const [ addition, setaddition ] = useState(0);
  const addValue = Number(addition) || 0;
  const resetAll = () => {
    setaddition(0)
    dispatch(reset())
  }

  const login_data = useSelector((state) => state.login.login)
  const password = useSelector((state) => state.login.password)
  const email = useSelector ((state) =>  state.login.email)
  const fullname = useSelector((state) => state.login.fullname)

  console.log(login_data)


    return (
      <section>
        <p>{count}</p>
        <p>login: {login_data}</p>
        <p>password: {password}</p>
        <p>email: {email}</p>
        <p>fullname: {fullname}</p>
        <div>
          <button onClick={()=> dispatch(increment())}>+</button>
          <button onClick={()=> dispatch(decrement())}>-</button>
        </div>

        <input type="text" value={addition} onChange={(e) => setaddition(e.target.value)}/>
        <button onClick={() => dispatch((incrementByAmount(addValue)))}>Add Amount</button>
        <button onClick={() => dispatch(resetAll)}>Add Amount</button>

      </section>
    );
  }
  
export default Home;