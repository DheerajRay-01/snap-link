import { User } from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
export const authMiddleWare = asyncHandler(async(req, res, next)=>{
    const token  = req.cookies.accessToken
    if(!token){
        throw new ApiError(401,"TOKEN_EXPIRED")
    }
    const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    if(!decodeToken){
        throw new ApiError(401,"TOKEN_EXPIRED")
    }

    const user = await User.findById(decodeToken._id).select("-refreshToken")
    // console.log(user);
    
    if(!user){
        throw new ApiError(401,"TOKEN_EXPIRED")
    }
  
    

    req.user = user

    next()

})

