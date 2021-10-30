const User = require("../model/user");
const UserVideo = require("../model/userVideoData")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (payload)=>{
    return jwt.sign(payload , process.env.JWT_SECRET);

}


const register = async(req,res)=>{
    try{
        let {username , email ,password} = req.body;

        const findUser = await User.findOne({email : email});
        if(findUser){
            return res.status(400).json({
                success : false,
                msg : "This email is already registered"
            })
        }
    
        password =  bcrypt.hashSync(password, 12);
        const newUser = new User({username , email , password});
        
        await newUser.save(async(err , docs)=>{
            if(err) throw err
            
            const newUserVideo = new UserVideo({ author : docs._id , likedVideos : [] , history: [] , playlists : [{
                title : "Watch later",
                videos : []
            }
            ]});
            await newUserVideo.save(async(err , docs)=>{
                if(err) throw err
                const token =  generateToken({_id : docs.author})
                res.status(200).json({
                    success : true,
                    msg : "user registered successfuly",
                    token
        
        
                })
            })
            
        })
    
    }
    catch(err){
        res.status(500).json({
            success : false ,
            msg : err.message
        })
    }
    }


const login = async(req,res)=>{
    try{
        let {email ,password} = req.body;

    const findUser = await User.findOne({email : email});
    if(!findUser){
        return res.status(400).json({
            success : false,
            msg : "User not exist"
        })
    }

    const verification = await bcrypt.compare(password , findUser.password);
    if(!verification){
        res.status(401).json({
            success : false,
            msg : "Incorrect password"
        })
    }
    const token = generateToken({_id : findUser._id})
     return res.status(200).json({
         success : true,
         msg :"logged in successfully",
         token
     })
    }
    catch(err){
        res.status(500).json({
            success : false,
            msg : err.message
        })
    }
   
    }


    const authAction = {
        login ,
        register
    }


    module.exports = authAction