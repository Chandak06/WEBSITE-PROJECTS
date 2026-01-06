import express from 'express';
import {ENV} from "./lib/env.js";   
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();


app.get("/api",(req,res)=>{
    res.status(200).json({message:"Server is running"});
})

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'../../frontend/dist')));
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
    })
}
app.listen(ENV.PORT,()=>{
    console.log(`Server is running on port ${ENV.PORT}`);
});

