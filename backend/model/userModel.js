import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    refreshToken:{
        type:"String"
    }
},{timestamps:true})

const userModel= mongoose.model("User",userSchema)

export default userModel;