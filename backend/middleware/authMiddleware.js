const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const user=require("../models/user")
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(
        req.headers.authorization&&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token=req.headers.authorization.split("")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await user.findById(decoded.id).select("-password")
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error("not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("not authorized,no token")
    
    }
    const admin=(req,res,next)=>{
        if(req.user&& req.user.isAdmin){
            next()
        }else{
            res.status(401)
            throw new Error("not authorized the admin")
        }
    }
})
module.exports={protect,admin}