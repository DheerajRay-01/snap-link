import dotenv from 'dotenv'
import { app } from "./app.js";
import connectDB from './config/connectDB.js';
dotenv.config()

connectDB()
.then(
    app.listen(process.env.PORT,()=>{
        console.log("App listening on port :",process.env.PORT);
    })
)
.catch((err)=>{
    console.log(err);
    
    }
)
