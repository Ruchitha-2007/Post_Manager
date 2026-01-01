import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({message:'All fields are required', success:false})
        }
        const existingUser=await userModel.findOne({email});
        if(!existingUser){
            return res.json({message:'No such userEmail is found', success:false});
        }
        const isMatch=await bcrypt.compare(password,existingUser.password)
        if(!isMatch){
            return res.json({message:'Incorrect password',success:false});
        }

        const accessToken= jwt.sign({id: existingUser._id},process.env.JWT_SECRET,{ expiresIn: '1m'});
        const refreshToken= jwt.sign({id: existingUser._id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '7d'});
        existingUser.refreshToken= refreshToken;
        await existingUser.save();
        return res.status(200).cookie('jwt',refreshToken,{httpOnly: true,
        sameSite: 'strict'}).send({message:'Login successful', success:true, accesstoken: accessToken , refreshToken:refreshToken,user:{name:existingUser.name}});
    }catch(err){
        return res.json({
            message:err,
            success:false
        })
    }
}


export const SignUp=async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        if(!name || !email || !password){
            return res.json({message:'All fields are required', success:false})
        }
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.json({message:'User already exists', success:false});
        }
        const hashedPwd=await bcrypt.hash(password,10);
        const newUser=new userModel({
            name,
            email,
            password: hashedPwd
        });
        await newUser.save();

        const accessToken = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: '1m'});
        const refreshToken= jwt.sign({id: newUser._id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '7d'});
        newUser.refreshToken= refreshToken;
        await newUser.save();
        return res.status(200).cookie('jwt',refreshToken,{httpOnly: true,
            sameSite: 'strict'}).send({message:'Login successful', success:true, accesstoken: accessToken , refreshToken:refreshToken,user:{name:newUser.name}});        
    }catch(err){
        return res.json({
            message:err,
            success:false
        })
    }
}
