import mongoose from 'mongoose'

const connectDB= async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log({message:'MongoDB connected successfully', success:true})
    }catch(err){
        console.log({message:err, success: false})
    }
}

export default connectDB;