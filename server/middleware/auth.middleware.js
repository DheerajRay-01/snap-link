import { User } from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
export const authMiddleWare = asyncHandler(async(req, res, next)=>{
    const token  = req.cookies.accessToken
    if(!token){
        throw new ApiError(401,"Access denied. Login required.")
    }
    const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    if(!decodeToken){
        throw new ApiError(401,"Unauthorize or Expired Token")
    }

    const user = await User.findById(decodeToken._id).select("-accessToken -refreshToken")
    // console.log(user);
    
    if(!user){
        throw new ApiError(401,"Failed to Get User from Token")
    }
  
    

    req.user = user

    next()

})

