import {useState} from 'react'
import api from './api/axios'
import { Link } from 'react-router-dom'

const PostItem = ({post,setTitle,setBody,handleDelete}) => {
    
  return (
    <div className="post-item">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Link
  className="edit-btn"
  to={`/posts/edit/${post._id}`}
  onClick={() => {
    setTitle(post.title);
    setBody(post.body);
  }}
>
  Edit Post
</Link>

        <button className="delete-btn" onClick={()=>handleDelete(post._id)}>Delete</button>
    </div>
  )
}

export default PostItem