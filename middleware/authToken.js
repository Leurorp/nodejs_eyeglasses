import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const authToken = (req,res,next)=> {
    const token=req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
            if (err) {return res.status(401).json({ message:'not Authorized' })}
            req.decodedToken=decodedToken  
            next()
        })
    } else {return res.status(401).json({message:"not authorized, token not available"})}
}