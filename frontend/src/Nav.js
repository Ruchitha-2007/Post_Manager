import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'

const Nav = ({handleSearch}) => {
    const [search,setSearch]=useState('')
    const {loggedIn}=useContext(AuthContext);
    const onSearchChange=(e)=>{
        setSearch(e.target.value);
        handleSearch(e.target.value);
    }
    if(loggedIn){
        return (
            <nav className="navbar-loggedIn">
                <Link className="link-home" to='/'>Home</Link>
                <Link className="link-posts" to='/posts'>Posts</Link>
                <Link className="link-contact" to='/contact'>Contact</Link>
                <Link className="link-logout" to='/auth/logout'>Logout</Link>
                <input
                  className="nav-search"
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={onSearchChange}
                />
            </nav>
          )
    }
  return (
    <nav className="navbar">
        <Link className="link-home" to='/'>Home</Link>
        <Link className="link-contact" to='/contact'>Contact</Link>
        <Link className="link-login" to='/auth/login'>Login</Link>
        <Link className="link-home" to='/auth/signup'>Signup</Link>
    </nav>
  )
}

export default Nav