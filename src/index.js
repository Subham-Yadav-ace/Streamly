import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log(`server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("connection error", err);
  }); //async --returns a promise

/*
import express from "express";
const app=express();

;(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
           console.log("error");
           throw error
       })
       app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
    }catch(error){
        console.log(error);
        throw err
    }
})()*/
