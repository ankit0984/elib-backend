import mongoose from "mongoose";
import { config } from "./config";

const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("connected to database.")
        })
        mongoose.connection.on("error",(err)=>{
            console.log(`error connecting to database: ${err}`)
        })
        
        await mongoose.connect(config.dburi as string);
        console.log("connection established.")
        


    } catch (error) {
        console.error("connection not established.")
        process.exit(1);
    }
}

export default connectDB;