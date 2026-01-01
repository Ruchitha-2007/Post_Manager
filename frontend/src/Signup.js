import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import api from './api/axios'
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";

const SignUp = () => {

    const {setName,setLoggedIn} =useContext(AuthContext)

    const navigate=useNavigate();
    const [nameLocal,setNameLocal]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    useEffect(()=>{
        setLoggedIn(false);
        setName('')
    },[])

    const handleSignup=async(e)=>{
        try{
            e.preventDefault();
                const response= await api.post('/auth/signup',{name:nameLocal,email,password}
            );
            console.log(response.data);
            const {accessToken}= response.data;
            localStorage.setItem('accessToken',accessToken);
            alert('Signup successful');
            setName(nameLocal);
            setLoggedIn(true);
            navigate('/posts');
        }catch(err){
            console.log(err);
            alert('Signup failed. Please try again.');
        }
    }
  return (
    <form className="signup" onSubmit={handleSignup} >
        <div className="signup-name" >
            <label className="signup-label-name" htmlFor="Name" >Name : </label>
            <input className="signup-input-name" to="Name" type="text" value={nameLocal} placeholder="Enter name" onChange={(e)=>{setNameLocal(e.target.value)}} required />
        </div>
        <div className="signup-email" >
            <label  className="signup-label-email" htmlFor="email" >Email : </label>
            <input className="signup-input-email" to="email" type="email" value={email} placeholder="Enter email address" onChange={(e)=>{setEmail(e.target.value)}} required />
        </div>
        <div className="signup-password" >
            <label className="signup-label-password" htmlFor="password" >Password : </label>
            <input className="signup-input-password" to="password" type="password" value={password} placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} required/>
        </div>
        <div className="signup-div">
            <button className="signup-btn" type="submit">Signup</button>
        </div>
        <div className="signup-form">
            Already have an account?
            {<Link className="signup-to-login" to='/auth/login'>Login</Link>}
        </div>
    </form>
  )
}


export default SignUp