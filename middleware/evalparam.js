
const Video = require("../model/video");
const getResponse = require("../controller/utils")

const video_param = async(req,res,next,id)=>{
   try {
    const findProduct = await Video.findById(id);
    req.video = findProduct;
    next()
   } catch (error) {
       getResponse(res,500,error.message)
}
}

const playlist_param = async(req,res,next,id)=>{
    try{
        req.playlist = id
        next();
    }catch(error){
        res.status(500).json({
            success : false,
            msg : error.message
        })
            
    }

}

const eval_param = {
    video_param,
    playlist_param
}


module.exports = eval_param