// import { useRef } from "react"
import Login from "./Molecule/login"
import { Outlet } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';


const useAuth = () => {
    const dispatch = useDispatch();

    const login_data = useSelector((state) => state.login.login)

    if (login_data != "") {
        return true
    }
    return false
    
}

// <Outlet is a function by react-router that simply just route you to where you want to go. 
const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Login />
}

export default ProtectedRoutes;