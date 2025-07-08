import mongoose, { Mongoose } from "mongoose";
const LinkSchema = new mongoose.Schema(
{
    originalUrl:{
        type : String,
        required:true,
        trim:true
    },
    shortUrl:{
        type : String,
        required:true,
        unique:true,
    },
    slug:{
        type : String,
        required:true,
        unique:true,
        trim:true
    },
    qrUrl:{
        type : String,
        default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    isProtected : {
        type: Boolean,
        default:false
    },
    password:{
        type: String,
      default: null,
    //   select: false, 
    },
    active:{
        type: Boolean,
        default:true    
    },
    clicks:{
        type:Number,
        default:0
    },
    clickLimit:{
      type:Number,
      default:0, 
    },
    title:{
        type:String,
    }
},
{
timestamps:true
})

export const Link = mongoose.model("Link",LinkSchema)