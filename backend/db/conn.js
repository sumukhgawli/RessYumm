import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'./config.env'});

const db = process.env.DATABASE;

mongoose.connect(db).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log("Database not connected")
})