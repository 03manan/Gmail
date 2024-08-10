import {User} from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res) => {
    try {
        const fullname = req.body.fullname;
        const email = req.body.email;
        const password = req.body.password;

        if(!fullname || !email || !password) return res.status(400).json({message: "All Fields are required!", success:false});
        const query = { email: email }; 
        const user = await User.findOne(query);

        if(user) return res.status(400).json({message:"User already exists with this email.", success: false});

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePhoto = 'https://avatar.iran.liara.run/public'
        await User.create({
             fullname, 
             email,
             password: hashedPassword,
             profilePhoto  
        })

        return res.status(201).json({
            message: "Account created succesfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).json({message: "All Fields are required!", success:false});
        
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({Message: "Incorrect Email or Password",success:false});
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched)  return res.status(401).json({Message: "Incorrect Email or Password",success:false});
        
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:"1d"});
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
           message:`${user.fullname} logged in successfully.`,
           user,
           success: true
        })
     } catch (error) {
        
    }
}

//Logout
export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully."
        })
    } catch (error) {
        console.log(error)
    }
}