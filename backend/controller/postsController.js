import Post from "../model/postModel.js";

const getAllPosts=async(req,res)=>{
    try{
        const user=req.user;
        const posts= await Post.find({user});// fetches all posts
        if(!posts){
            return res.json({message:'No posts found'});
        }
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const createPost=async(req,res)=>{
    try{
        const {title,body}= req.body;
        const user= req.user;
        if(!title || !body){
            return res.status(400).json({message:'Title and body are required'});
        }
        const newPost= new Post({
            title,
            body,
            user
        })
        await newPost.save();
        return res.status(201).json({message:'Post created successfully', newPost});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const deletePost=async(req,res)=>{
    try{
        const {id}= req.params;
        const deletedPost= await Post.findById(id);
        if(!deletedPost){
            return res.status(404).json({message:'Post not found'});
        }
        await deletedPost.deleteOne();
        return res.status(200).json({message:'Post deleted successfully', deletedPost});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const updatePost= async(req,res)=>{
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({message:'Post not found'});
        }
        const {title,body}= req.body;
        post.title= title || post.title;
        post.body= body || post.body;
        await post.save();
        return res.status(200).json({message:'Post updated successfully', updatePost:post});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export {getAllPosts, createPost, deletePost, updatePost};