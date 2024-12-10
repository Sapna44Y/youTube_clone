import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MongoDB_URL)

// Set up the connection to MongoDB
const db = mongoose.connection
db.on("open",()=>{
    console.log("MongoDB Connected Successfully");
})
db.on("error", ()=>{
    console.log("Error : Database connection failed");
})

export default db;