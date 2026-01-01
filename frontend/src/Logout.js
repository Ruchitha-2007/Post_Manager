import React,{useContext,useEffect} from 'react'
import { AuthContext } from './context/AuthContext'
import {useNavigate} from 'react-router-dom';
import api from './api/axios'

const Logout = () => {
    const navigate= useNavigate();
    const {setName,setLoggedIn}=useContext(AuthContext);
    useEffect(()=>{
        const logoutUser=async()=>{
            try{
                await api.post('/auth/logout',{withCredentials:true});
                localStorage.removeItem("accessToken")
                console.log('Logged out successfully')
                setName('');
                setLoggedIn(false);
                navigate('/auth/login')
            }catch(err){
                console.log(err.message)
            }
        }
        logoutUser();
    },[navigate,setName,setLoggedIn])
  return (
    <p>Logging out...</p>
  )
}

export default Logout