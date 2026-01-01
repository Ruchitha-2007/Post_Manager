import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Missing = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    },[])
  return (
    <main>
        
    </main>
  )
}

export default Missing