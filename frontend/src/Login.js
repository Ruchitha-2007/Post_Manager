import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import api from './api/axios'
import {useContext} from 'react';
import { AuthContext } from './context/AuthContext';

const Login = () => {
    const {setName,setLoggedIn}= useContext(AuthContext)
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    useEffect(()=>{
        setLoggedIn(false);
        setName('')
    },[setLoggedIn,setName])

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
                const response= await api.post('/auth/login',{email,password}
            );
            console.log(response.data);
            const {accessToken}= response.data;
            localStorage.setItem('accessToken',accessToken);
            alert('Login successful');
            setName(response.data.user.name);
            setLoggedIn(true);
            navigate('/posts');
        }catch(err){
            console.log(err);
            alert('Login failed. Please try again.');
        }
    }
  return (
    <form className="login" onSubmit={handleLogin} >
            <div className="login-email" >
            <label className="login-label-email" htmlFor="email" >Email : </label>
            <input className="login-input-email" name="email" type="email" value={email} placeholder="Enter email address" onChange={(e)=>{setEmail(e.target.value)}} required />
        </div>
        <div className="login-password" >
            <label className="login-label-password" htmlFor="password" >Password : </label>
            <input className="login-input-password" name="password" type="password" value={password} placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} required/>
        </div>
        <div className="login-div-btn">
            <button className="login-btn" type="submit">Login</button>
        </div>
        <div className="signup-form">
            Don't have an account?
            <Link to='/auth/signup'>Signup</Link>
        </div>
    </form>
  )
}

export default Login