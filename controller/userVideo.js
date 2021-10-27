const getResponse = require("./utils.js");
const UserVideo = require("../model/userVideoData");





const getUserInfo = async (req,res)=>{
  const user = req.user;
  try{

    const findUserData = await UserVideo.findOne({ author: user._id }).select("-_id -author");
    if (!findUserData) {
      return getResponse(res, 400, "User Data  Not Found");
    }
    const popData = await findUserData.populate("likedVideos history playlists.videos");
    getResponse(res,200,"Data loaded",popData)


  }catch(error){
    getResponse(res,500,error.message)
  }
}






const addToHistory = async (req, res) => {
  const user = req.user;
  const video = req.video;
  try {
    const findUserData = await UserVideo.findOne({ author: user._id });
    if (!findUserData) {
      return getResponse(res, 400, "User Data  Not Found");
    }

    const checkDuplicate = await findUserData.history.find(
      (history) => history.toHexString() === video.id
    );

    if (checkDuplicate) {
      await findUserData.history.pull(video._id);
    }

    await findUserData.history.unshift(video._id);
    await findUserData.save(async (err, docs) => {
      if (err) throw err;
      const popData = await docs.populate("history");
      getResponse(res, 200, "User Data Found", popData);
    });
  } catch (error) {
    getResponse(res, 500, error.message);
  }
};








const removeFromHistory = async (req, res) => {
  const user = req.user;
  const video = req.video;
  try {
    const findUserData = await UserVideo.findOne({ author: user._id });
    if (!findUserData) {
      return getResponse(res, 400, "User Data  Not Found");
    }

    const videoForDeletion = await findUserData.history.find(
      (history) => history.toHexString() === video.id
    );
    if (!videoForDeletion) {
      return getResponse(res, 400, "video not found");
    }
    await findUserData.history.pull(videoForDeletion);
    await findUserData.save();
    const popData = await findUserData.populate("history");
    getResponse(res, 200, "History updated", popData);
  } catch (error) {
    getResponse(res, 500, error.message);
  }
};






const clearHistory = async (req, res) => {
  const user = req.user;
  try {
    let findUserData = await UserVideo.findOne({ author: user._id });
    if (!findUserData) {
      return getResponse(res, 400, "User Data  Not Found");
    }

    findUserData.history = [];
    console.log(findUserData);
    await findUserData.save();
    const popData = await findUserData.populate("history");
    getResponse(res, 200, "History all cleared", popData);
  } catch (error) {
    getResponse(res, 500, error.message);
  }
};




const likeVideo = async (req, res) => {
  const user = req.user;
  const video = req.video;
  try {
    const findUserData = await UserVideo.findOne({ author: user._id });
    if (!findUserData) {
      return getResponse(res, 400, "User data not found");
    }

    const checkDuplicate = findUserData.likedVideos.find(
      (data) => data.toHexString() === video.id
    );
    console.log(findUserData);
    console.log(checkDuplicate);
    if (checkDuplicate) {
      await findUserData.likedVideos.pull(checkDuplicate);
    } else {
      await findUserData.likedVideos.unshift(video._id);
    }

    await findUserData.save(async (err, docs) => {
      if (err) throw err;
      const popData = await docs.populate("likedVideos");
      getResponse(res, 200, "Liked videos updated", popData);
    });
  } catch (err) {
    getResponse(res, 500, err.message);
  }
};








const createPlaylist = async (req, res) => {
  const user = req.user;
  const video = req.video;
  const { newTitle } = req.body;

  try {
    let findUserData = await UserVideo.findOne({ author: user._id });

    if (!findUserData) {
      return getResponse(res, 400, "User data not found");
    }

    let findPlaylist = await findUserData.playlists.find(
      (playlist) => playlist.title === newTitle
    );
    if (!findPlaylist) {
      await findUserData.playlists.push({ title: newTitle  , videos : []});
      await findUserData.save()
    }

    findUserData = await UserVideo.findOne({ author: user._id });

    findPlaylist = await findUserData.playlists.find(
      (playlist) => playlist.title === newTitle
    );

    

    const findVideo = await findPlaylist.videos.find((item)=>item._id.toHexString() === video.id);
    
    if(findVideo){
      return getResponse(res,400,"Video already there")
    }

    await findUserData.playlists
      .find((video) => video.title === newTitle)
      .videos.push(video._id);

    await findUserData.save(async (err, docs) => {
      if (err) throw err;
      const popData = await findUserData.populate("playlists.videos");
      getResponse(res, 200, "playlist updated0", popData);
    });
  } catch (err) {
    getResponse(res, 500, err.message);
  }
};






const removeVideoFromPlaylist = async(req,res)=>{
  try{
    const user = req.user
    const playlist = req.playlist;
    const video = req.video;
    console.log(playlist)

    const findUserData = await UserVideo.findOne({author : user._id});
    if(!findUserData){
      getResponse(res,400,"User data not found")
    }

    const findPlaylist = await findUserData.playlists.find((item)=>item.id === playlist);
    console.log("findPlaylist ",findPlaylist)
    if(!findPlaylist){
      getResponse(res,400,"Playlist not available")
    }
    await findUserData.playlists
      .find((item) => item.id === playlist)
      .videos.pull(video._id);

    await findUserData.save(async(err,docs)=>{
      if(err)throw err;
      const popData = await findUserData.populate("playlists.videos");
      getResponse(res,200,"playlist updated", popData)
    })



  }catch(error){
    getResponse(res,500,error.message)

  }
}







const removePlaylist = async (req, res) => {
  try {
    const user = req.user;
    const playlist  = req.playlist;

    const findUserData = await UserVideo.findOne({ author: user._id });

    if (!findUserData) {
      return getResponse(res, 400, "User data not found");
    }

    console.log(playlist);
    console.log(findUserData.playlists[0].id);
    const findPlaylist = await findUserData.playlists.find(
      (item) => item.id === playlist
    );
    console.log(findPlaylist);
    if (!findPlaylist) {
      return getResponse(res, 400, "Playlist not found");
    }

    await findUserData.playlists.pull(findPlaylist);
    await findUserData.save(async (err, docs) => {
      if (err) throw err;
      const popData = await findUserData.populate("playlists.videos");
      getResponse(res, 200, "Playlist updated", popData);
    });
  } catch (error) {
    getResponse(res, 500, error.message);
  }
};








const videoAction = {
  getUserInfo,
  addToHistory,
  removeFromHistory,
  clearHistory,
  likeVideo,
  createPlaylist,
  removePlaylist,
  removeVideoFromPlaylist
};

module.exports = videoAction;
