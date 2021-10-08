const Video = require("../model/video");

const postVideo = async (req, res) => {
  try {
    const { title,thumbnail , url, creator, creatorUrl , description } = req.body;
    const newVideo = new Video({ title, thumbnail, url, creator, creatorUrl , description });
    await newVideo.save((err) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        msg: "Video added successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Video.find({});
    if (!video) {
      return res.status(400).json({
        success: false,
        msg: "Error in fetching data",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Data fetched successfully",
      payload: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  postVideo,
  getVideo,
};
