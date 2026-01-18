import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB=async()=>{
    try {
        if(!ENV.DB_URL){
            throw new Error("DB_URL IS NOT DEFINED");
        }
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to MongoDB",conn.connection.host)
    } catch (error) {
        console.error("Error connecting to mongoDB",error);
        process.exit(1);
    }
}