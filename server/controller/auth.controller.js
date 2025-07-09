// import jwt from "jsonwebtoken";
import { log } from "console";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken'

const googleAuth = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const { _id, email, fullName } = user;

  const accessToken = generateAccessToken({ _id, fullName, email });
  const refreshToken = generateRefreshToken({ _id, email });

  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Tokens not generated");
  }

  // Save tokens to DB (optional)
  await User.findByIdAndUpdate(_id, {refreshToken});

  const cookieOptions = {
    httpOnly: true,
    secure: false, 
    sameSite: "Lax",
  };

  return res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1 * 60 * 1000, // 15 min
      //  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .redirect(process.env.CORS_ORIGIN);
});


const logOut = asyncHandler(async (req, res) => {
  const { _id } = req.user;

    if (!_id) {
    throw new ApiError(401,"User not Fetched")
  }
  await User.findByIdAndUpdate(_id, { refreshToken: null });

  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200,{},"logOut Success"))
});


const getCurrentUser = asyncHandler(async (req, res) => {

  const user = req.user;
   if (!user) {
    throw new ApiError(401,"User not Fetched")
  }

  return res
    .status(200)
    .json(new ApiResponse(200,user,"User Fetched")); 
});





const failure = asyncHandler(async(req, res)=>{
    res.redirect(process.env.CORS_ORIGIN)
})


const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // console.log(refreshToken);
  // console.log("jiii");
  
  

  if (!refreshToken) {
    throw new ApiError(400, "Refresh Token Not Found");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or Expired Refresh Token");
  }

  const user = await User.findById(decoded._id);


  if (!user) {
    throw new ApiError(404, "User Not Found While Refreshing Access Token");
  }
// console.log(user);


  if (user.refreshToken !== refreshToken) {
  throw new ApiError(403, "Refresh token does not match");
}



const accessToken =  generateAccessToken({_id:user._id, user:user.fullName, email:user.email});
console.log("jji");

  // console.log(accessToken);
  

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true for HTTPS
    sameSite: "Lax",
  };

  return res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1 * 60 * 1000, // 5 min
    })
    .status(200)
    .json(new ApiResponse(200, {}, "Access Token Generated"));
});



export { googleAuth ,failure,logOut,getCurrentUser ,refreshAccessToken};
