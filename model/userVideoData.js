const mongoose = require("mongoose");

const userVideoSchema = new mongoose.Schema(
  {
    author : String,
    likedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    playlists: [
      {
        id: mongoose.Schema.Types.ObjectId , 
        title:{
          type : String
        },
        videos: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserVideo = mongoose.model("UserVideo", userVideoSchema);

module.exports = UserVideo;
