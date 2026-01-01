import userModel from '../model/userModel.js';

export const Logout=async(req,res)=>{
    try{
        const refreshToken= req.cookies.jwt
        if(refreshToken){
            const existingUser= await userModel.findOne({refreshToken});
            if(existingUser){
                existingUser.refreshToken=null;
                await existingUser.save();
            }
        }
        res.clearCookie('jwt',{httpOnly:true, sameSite: 'strict'});// clears the cookie whose name is jwt
        return res.status(200).json({message:'Logged out successfully', success:true})
    }catch(err){
        return res.json({ message: err.message, success:false})
    }
}