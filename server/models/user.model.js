import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
{
    fullName:{
        type : String,
        required:true,
        trim:true
    },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
},

    password:{
        type : String,
        // required:true,
        trim:true
    },
    avatar:{
        type : String,
        default:""
    },
    refreshToken:{
        type:String,
        default:null,
        // required:true,
    }
},
{
timestamps:true
})


export const User = mongoose.model("User",userSchema)