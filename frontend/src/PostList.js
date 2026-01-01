import PostItem from './PostItem'
import { useNavigate } from 'react-router-dom';

const PostList = ({posts,setTitle,setBody,add,setAdd,handleSubmit,handleDelete}) => {
    const navigate= useNavigate();
  return ( 
    <>
        <button
          className="add-post-btn" onClick={() => { setAdd(true); 
                                                    navigate('/newPost');}}
        >
          Add New Post
        </button>

        {!add && posts.map((post)=>(
            <PostItem key={post._id}
                post={post}
                setTitle={setTitle}
                setBody={setBody}
                handleDelete={handleDelete}
            />
        ))}
    
    </>
    
  )
}

export default PostList