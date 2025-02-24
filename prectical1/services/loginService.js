const express = require('express')

const router = express.Router()

const jwt = require('jsonwebtoken')

const SECRET_KEY = "NOTESAPI";

const db = require('../config/db/mySqlConfig.js')

const bcrypt = require("bcrypt");

const {validName,validEmail}=require("../Utility/validationUtility.js")

const registerModel=require('../models/registerModel.js')

const generateToken = require("../Utility/generateToken.js");

const userTokenModel=require("../models/userTokenModel")
const signup = async (req, res) => {
    const t = req.t;
    try {
        const { username, password, email } = req.body;

        //validation 
        if (!username || !password || !email) {
            return res.status(500).send({
                success: false,
                message: "Please enter all fields"
            })
        }

        if(!validName(username)){
            return res.status(400).send({
                success:false,
                message:"username contain only alpha..."
            })
        }

        if(!validEmail(email)){
            return res.status(400).send({
                success:false,
                message:"Email enter in valid format"
            })
        }

// email verify

        const exisitingUser = await registerModel.findOne({ where: { email }})

        if (exisitingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await registerModel.create({username, password: hashedPassword, email});


        res.status(201).json({
            user: { id: result.insertId, username, email },
            message: t("success") 
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: t("error") })
    }

}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {

        const exisitingUser = await registerModel.findOne({ where: { email }});

        if (!exisitingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const matchPwd = await bcrypt.compare(password, exisitingUser.password);

        if (!matchPwd) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const { accessToken, refreshToken } =  await generateToken(exisitingUser);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);



        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // Prevents JS access
            secure: false,  // Change to true if using HTTPS
            sameSite: "lax", // Helps with cross-origin requests
            path: "/",
          });
          

    
        
        
        res.status(200).json({
            user: {
                id: exisitingUser.id,
                username: exisitingUser.username,
                email: exisitingUser.email
            },
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" })
    }

}


const newAccessToken=async(req,res)=>{


    const refreshToken = req.cookies.refreshToken;

    console.log("Received Cookies:", req.cookies); 

    if (!req.cookies || !req.cookies.refreshToken) {
      return res.status(403).json({ message: "No refresh token provided" });
    }
  
    console.log("Extracted Refresh Token:", refreshToken);

    console.log("refresh token:",refreshToken)
  
    if (!refreshToken) {
      return res.status(403).json({ message: 'No refresh token provided' });
    }
  
    try {
      const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
      const userId = decodedRefreshToken._id;
  
      const user = await userTokenModel.findOne({ where: { userId } });
  
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
  
      const newAccessToken = jwt.sign(
        {  _id: user.id } ,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: '1m' }
      );
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error during token refresh:', error);
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
}


const logout=async(req,res)=>{
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
        expires: new Date(0), 
        path: "/", 
    });

    res.status(200).json({ message: "Logged out successfully" });
}

module.exports={signup,signIn,newAccessToken,logout}