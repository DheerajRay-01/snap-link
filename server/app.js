// server/app.js
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import { getDate } from './utils/getDate.js';
import linkRoutes from './routes/link.route.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import passport from 'passport';
import './config/passport.js'
// import { authMiddleWare } from './middleware/auth.middleware.js';
dotenv.config();

const app = express();

app.use(passport.initialize()); 

//  CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Parse cookies
app.use(cookieParser());

// Parse JSON & URL-encoded bodies
app.use(express.json()); // Needed for JSON body
app.use(urlencoded({ extended: true }));

// " / " Route
app.get("/", (req, res) => {
  const date  = getDate()
  res.status(200).json({
    success: true,
    message: "✅ Snap-Link backend is running!",
    timestamp: date,
  });
});



// All Routes
// app.use("/links", (req,res)=>{
//     console.log("hello");
//     res.send("ok")
    
// }); // Mount your routes here

app.use('/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/links',linkRoutes)


// app.use('/api/check',authMiddleWare,(req,res)=>{
//   res.json({cookie:req.cookies.accessToken})
// })



//Global Error Handler 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export { app };
