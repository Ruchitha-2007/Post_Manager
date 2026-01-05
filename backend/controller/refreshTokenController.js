import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

export const refresh=async(req,res)=>{
    try{
        const refreshToken=req.cookies.jwt;
        if(!refreshToken){
            return res.status(401).json({message:'No refresh token provided'});
        }
        const existingUser= await userModel.findOne({refreshToken});
        if(!existingUser){
            return res.status(403).json({message:'Invalid refresh token no user found'});
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }
            const accessToken= jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1m'});
            return res.status(200).json({message:'Access token generated successfully', accessToken,user:{existingUser.name});
        })
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
