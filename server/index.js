import express from "express"
import dotenv from "dotenv"
import connectDB from "./Database/connectDB.js";
import cookieParser from "cookie-parser"
import cors from "cors"; 
import userRoute from "./Routes/user.route.js";
import emailRoute from "./Routes/email.route.js";

const app = express();
dotenv.config({
     path: "./env"
});
connectDB();
const PORT = 3000;

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:"http://localhost:5173", 
    credentials:true
}

app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/email", emailRoute)

app.listen(PORT, ()=>{
    console.log( `Ore mori maiyya je kiya dekh lio @${PORT}`)
});