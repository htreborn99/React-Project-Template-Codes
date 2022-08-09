import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// File Depencies
import Navbar from './Molecule/navbar';
import Home from './Molecule/home';
import Signup from './Molecule/signup';
import Profile from './Molecule/profile';
import Login from"./Molecule/login";
import ProtectedRoutes from './Protectedroutes';


function App() {
  return (
    <div className="App">
      <Navbar />
          <Routes>
            <Route path="/" exact  element = {<Home />} />
            <Route element = {<ProtectedRoutes />}>
              <Route path="/profile"  element = {<Profile />} />
            </Route>
              <Route path="/signup"  element = {<Signup />} />
              <Route path="/login"  element = {<Login />} />
          </Routes>
    </div>
  );
}

export default App;
