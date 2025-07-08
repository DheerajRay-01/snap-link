import mongoose from 'mongoose'
import { config } from '../utils/constants.js'


const mongodbURI = process.env.MONGO_DB_URI;
const DB_name = config.DB_name;

const connectDB = async () =>{
    try {
      await  mongoose.connect(`${mongodbURI}/${DB_name}`)  
      console.log("🌐 MongoDB connected 🌐");
          
    } catch (error) {
        log.error("Error in Connecting Database :",error)
    }
}

export default connectDB

