import React,{useState,useEffect} from 'react'
import api from './api/axios';
import PostList from './PostList';

const PostPage = ({posts,setPosts,setSearchPosts,setTitle,setBody,add,setAdd,handleSubmit,handleDelete}) => {
    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const postsResponse= await api.get('/posts');
                setPosts(postsResponse.data);
                setSearchPosts(postsResponse.data);
                console.log(postsResponse.data);
            }catch(err){
                console.log(err);
                alert('Failed to fetch posts after login.');
            }
        };
        fetchPosts();
    }, [

    ]);
   
  return (
    <div className="postpage">
        {
            posts.length ? (
                <PostList posts={posts} 
                setTitle={setTitle} 
                setBody={setBody} 
                add={add}
                setAdd={setAdd}
                handleSubmit={handleSubmit} 
                handleDelete={handleDelete} />
            ) : (
                <>
                <PostList posts={posts} 
                setTitle={setTitle} 
                setBody={setBody} 
                add={add}
                setAdd={setAdd}
                handleSubmit={handleSubmit} 
                handleDelete={handleDelete} />
                <p className='no-posts'>No posts available.</p>
                </>
            )
        }
    </div>
  )
}

export default PostPage