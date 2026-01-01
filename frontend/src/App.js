import React,{useState} from 'react';
import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import Contact from './Contact'
import PostPage from './PostPage';
import EditPost from './EditPost';
import NewPost from './NewPost'
import Missing from './Missing'
import Footer from './Footer'
import Login from './Login';
import Signup from './Signup'
import Logout from './Logout';
import {Route,Routes} from 'react-router-dom'
import api from './api/axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [posts,setPosts]=useState([]);
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [add,setAdd]=useState(false);
  const [searchPosts,setSearchPosts]=useState([]);

  const navigate= useNavigate();

  const handleSearch=(async(query)=>{
    if(!query.trim()){
      setSearchPosts(posts);
      return;
    }
    const filtered=posts.filter((p)=>p.title.toLowerCase().includes(query.toLowerCase()) || p.body.toLowerCase().includes(query.toLowerCase()));
    setSearchPosts(filtered);
  })


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response= await api.post('/posts',{title,body});
        console.log(response.data);
        console.log('Post created successfully');
        setPosts(posts=>[...posts,response.data.newPost])
        setSearchPosts(posts);
        setTitle('');
        setBody('');
        navigate('/posts');
        setAdd(false);
    }catch(err){
        console.log(err.message);
        alert('Failed to create post. Please try again.');
    }
}
const handleUpdate=async(e,id)=>{
  e.preventDefault()
    try{
        const response= await api.put(`/posts/${id}`,{title,body});
        const updatedPosts= posts.map(p=>(p._id===id ? response.data.updatePost : p));
        setPosts(updatedPosts);
        setSearchPosts(updatedPosts);
        console.log(response.data);
        console.log('Post updated successfully');
        setTitle('');
        setBody('');
        navigate('/posts')
    }catch(err){
        console.log(err);
        alert('Failed to update post. Please try again.');
    }
}
const handleDelete=async(id)=>{
    try{
        const deletedPost= posts.filter(p=>(p._id!==id)); 
        await api.delete(`/posts/${id}`);
        setPosts(deletedPost);
        setSearchPosts(deletedPost);
        console.log('Post deleted successfully');
        navigate('/posts')
    }catch(err){
        console.log(err);
        alert('Failed to delete post. Please try again.');
    }
}
  return (
    <div className="app-container">
      <Header/>
      <Nav handleSearch={handleSearch} />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts" element={<PostPage posts={searchPosts} 
                                                  setPosts={setPosts}
                                                  setSearchPosts={setSearchPosts}
                                                  setTitle={setTitle}
                                                  setBody={setBody} 
                                                  add={add}
                                                  setAdd={setAdd}
                                                  handleSubmit={handleSubmit} 
                                                  handleDelete={handleDelete} />} />
          <Route path="/newPost" element={<NewPost title={title} 
                                                  setTitle={setTitle} 
                                                  body={body} 
                                                  setBody={setBody} 
                                                  add={add}
                                                  setAdd={setAdd}
                                                  handleSubmit={handleSubmit} />} />
          <Route path="/posts/edit/:id" element={<EditPost  posts={searchPosts}
                                                            setPosts={setPosts} 
                                                            handleUpdate={handleUpdate}
                                                            title={title}
                                                            body={body}
                                                            setTitle={setTitle}
                                                            setBody={setBody} />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App;
