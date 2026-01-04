import React,{useContext,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'

const EditPost = ({posts,handleUpdate,title,body,setTitle,setBody}) => {
  const {setLoggedIn}= useContext(AuthContext);
  const {id}= useParams();
  const post= posts.find(p=>(p._id==id));
  
  useEffect(() => {
    setLoggedIn(true)
  }, [setLoggedIn])
  if(!post){
    return <p>Post not found</p>
  }
  return (
      <form className="edit-post" onSubmit={(e)=>handleUpdate(e,id)} >
        <div className="edit-div-title">
          <label htmlFor='edit-title' >Edit Post Title</label>
          <input 
            type="text" 
            id="edit-title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            required />
          </div>
          <div className="edit-div-body">
            <label htmlFor='edit-body' >Edit Post Body</label>
            <textarea 
              id="edit-body" 
              value={body} 
              onChange={(e)=>setBody(e.target.value)} 
              required />
          </div>
          <button className='edit-post-btn' type="submit" >Update Post</button>
      </form>
  )
}

export default EditPost