import jwt from 'jsonwebtoken'

const generateAccessToken = (payload) => {
     const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
     return accessToken
}

const generateRefreshToken = (payload) => {
     const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
     return refreshToken
}






export {
    generateAccessToken,
    generateRefreshToken
}