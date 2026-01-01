import React,{useContext,useEffect} from 'react'
import { AuthContext } from './context/AuthContext'
import { useNavigate } from 'react-router-dom';

const NewPost = ({title,setTitle,body,setBody,add,setAdd,handleSubmit}) => {
    const navigate= useNavigate();
    const {setLoggedIn}=useContext(AuthContext);
    useEffect(() => {
    setLoggedIn(true)
  }, [setLoggedIn])
  return (
    <form className="new-post" onSubmit={(e)=>handleSubmit(e)} >
        <div className="new-div-title">
          <label htmlFor='new-title' >Post Title</label>
          <input 
            type="text" 
            id="new-title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            required />
          </div>
          <div className="new-div-body">
            <label htmlFor='edit-body' >Post Body</label>
            <textarea 
              id="new-body" 
              value={body} 
              onChange={(e)=>setBody(e.target.value)} 
              required />
          </div>
          <button className='new-post-btn' type="submit" >Add Post</button>
          <button className='new-post-cancel-btn' onClick={()=>{navigate('/posts');setAdd(false)}} >Cancel</button>
      </form>
  )
}

export default NewPost