import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//from cloudinary
        requried:true
    },
    coverImage:{
        type:String,//from cloudinary
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video",
        
    }],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
//donot use arrow function as there is no this access
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
//we can add custom methods to add new methods /function to the Schema
userSchema.methods.isPasswordCorrect=async function (password){
  return  await bycrpt.compare(password,this.password)//return true or false, this.password is hashed password
}


userSchema.methods.generateAccessToken=function(){
   return  jwt.sign({
        id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname,
    }
,process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign({
        id:this._id,
    }
,process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}
export const  User=mongoose.model("User",userSchema)