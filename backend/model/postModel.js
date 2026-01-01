import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
    title:{
        type:"String",
        trim:true,
        required:true
    },
    body:{
        type:"String",
        required:true,
        trim:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{timestamps:true});

const Post= mongoose.model("Post",postSchema);

export default Post;